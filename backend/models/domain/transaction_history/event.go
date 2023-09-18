package transaction_history

import (
	"container/heap"
	m_rep "sleuth/models/repository"
	"sleuth/utils"
	"sort"
	"strconv"
	"strings"
	"time"
)

// 將repository rsp 轉換到 domain model中
func ConvertRspToSvcModel(txrep *m_rep.TransactionResponse) *TransactionResponse {
	return &TransactionResponse{
		BaseResp: BaseResp{
			Status:  txrep.Status,
			Type:    txrep.Type,
			Message: txrep.Message,
		},
		Result: txrep.Result,
	}
}

func (tx *TransactionResponse) FilterTransactionsWithinTimeRange(timeRange int) {
	var target []m_rep.Transaction
	now := time.Now().Unix()

	for _, v := range tx.Result {
		timeStamp, err := strconv.ParseInt(v.TimeStamp, 10, 64)
		if err == nil {
			t := time.Unix(timeStamp, 0)
			secondsDiff := now - t.Unix()
			if secondsDiff <= int64(timeRange) {
				target = append(target, v)
			} else {
				break
			}
		}
	}
	tx.Result = target
}

func (tx *TransactionResponse) FindTopFiveTransactionsByAmount(address string) []AmountType {
	sort.Slice(tx.Result, func(i, j int) bool {
		amountI, errI := strconv.ParseFloat(tx.Result[i].Value, 64)
		amountJ, errJ := strconv.ParseFloat(tx.Result[j].Value, 64)
		if errI != nil || errJ != nil {
			return false
		}
		return amountI > amountJ
	})

	var target []AmountType
	countMap := make(map[string]int)
	recordMap := make(map[string][]string)

	// 找出不重複錢包地址中交易前五大的錢包地址
	for _, v := range tx.Result {
		if strings.EqualFold(v.From, address) {
			var amountType AmountType
			countMap[v.To]++
			amountType.From = v.From
			amountType.To = v.To
			amountType.Value = v.Value
			if countMap[v.To] == 1 {
				target = append(target, amountType)
			}
			if len(countMap) == 5 {
				break
			}
		}
	}

	// 紀錄相同錢包地址的所有BlockHash
	for _, v := range tx.Result {
		recordMap[v.To] = append(recordMap[v.To], v.Hash)
	}

	var count int = 0
	for key := range countMap {
		if txHashSlice, exists := recordMap[key]; exists {
			target[count].TxHashArray = txHashSlice
			count++
		}
	}

	return target
}

func (tx *TransactionResponse) FindTopFiveTransactionsByFrequency(address string) []FrequencyType {
	mapTransactions := make(map[string]int)
	var topFive utils.MinHeap
	heap.Init(&topFive)

	// 計數相同錢包地址的交易頻次
	for _, v := range tx.Result {
		if strings.EqualFold(v.From, address) {
			mapTransactions[v.To]++
		}
	}

	// 篩出前五大交易頻次的錢包地址
	for key, value := range mapTransactions {
		if topFive.Len() < 5 {
			heap.Push(&topFive, utils.Pair{To: key, Count: value})
		} else if topFive[0].Count < value {
			heap.Pop(&topFive)
			heap.Push(&topFive, utils.Pair{To: key, Count: value})
		}
	}

	recordMap := make(map[string][]string)
	// 紀錄相同錢包地址的所有BlockHash
	for _, v := range tx.Result {
		recordMap[v.To] = append(recordMap[v.To], v.Hash)
	}

	var target []FrequencyType
	for _, pair := range topFive {
		var frequencyType FrequencyType
		frequencyType.From = address
		frequencyType.To = pair.To
		frequencyType.Frequency = pair.Count
		frequencyType.TxHashArray = recordMap[pair.To]
		target = append(target, frequencyType)
	}

	return target
}
