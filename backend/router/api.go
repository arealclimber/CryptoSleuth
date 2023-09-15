package router

import (
	"container/heap"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	m "sleuth/models/router"
	"sleuth/utils"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func (router *Router) ping(c *gin.Context) {
	c.JSON(200, gin.H{"message": "pong"})
}

func (router *Router) version(c *gin.Context) {
	c.JSON(200, router.infra.Info)
}

func (router *Router) getAssetTransfers(c *gin.Context) {
	address := c.Query("address")
	tr := c.DefaultQuery("time_range", "60")
	reqType := c.DefaultQuery("type", "amount") // amount or frequency
	timeRange, err := strconv.Atoi(tr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Time range parameter must be a number",
		})
		return
	}

	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Address parameter is required",
		})
		return
	}
	url := "https://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=" + router.infra.Config.Etherscan.Token

	body, err := utils.Request("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}

	var rsp m.TransactionResponse
	err = json.Unmarshal(body, &rsp)
	if err != nil {
		log.Printf("error: can't unmarshal JSON: %s", err)
	}

	if rsp.Message != "OK" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": rsp.Message,
		})
		return
	}

	var target m.Response
	transactionsWithinRange := filterTransactionsWithinTimeRange(rsp, timeRange)
	if reqType == "frequency" {
		TopFiveTransactionsByFrequency := findTopFiveTransactionsByFrequency(address, transactionsWithinRange)
		target.Type = "frequency"
		target.Result = TopFiveTransactionsByFrequency
	}
	if reqType == "amount" {
		TopFiveTransactionsByAmount := findTopFiveTransactionsByAmount(address, transactionsWithinRange)
		target.Type = "amount"
		target.Result = TopFiveTransactionsByAmount
	}

	c.JSON(http.StatusOK, target)
}

func (router *Router) getBalance(c *gin.Context) {
	address := c.Query("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Address parameter is required",
		})
		return
	}
	url := "https://api.etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey=" + router.infra.Config.Etherscan.Token

	body, err := utils.Request("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}

	var rsp m.Response
	err = json.Unmarshal(body, &rsp)
	if err != nil {
		log.Printf("error: can't unmarshal JSON: %s", err)
	}

	if rsp.Message != "OK" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("error: %s", rsp.Message),
		})
		return
	}

	c.JSON(http.StatusOK, rsp)
}

func (router *Router) getAssetTransferByTxhash(c *gin.Context) {
	txhash := c.Query("txhash")
	if txhash == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "txhash parameter is required",
		})
		return
	}
	url := "https://api.etherscan.io/api?module=account&action=txlist&txhash=" + txhash + "&apikey=" + router.infra.Config.Etherscan.Token

	body, err := utils.Request("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}

	var rsp m.Response
	err = json.Unmarshal(body, &rsp)
	if err != nil {
		log.Printf("error: can't unmarshal JSON: %s", err)
	}

	if rsp.Message != "OK" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("error: %s", rsp.Message),
		})
		return
	}

	c.JSON(http.StatusOK, rsp)
}

func filterTransactionsWithinTimeRange(transactions m.TransactionResponse, timeRange int) []m.Transaction {

	var target []m.Transaction

	now := time.Now().Unix()

	for _, v := range transactions.Result {
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

	return target
}

func findTopFiveTransactionsByAmount(address string, transactions []m.Transaction) []m.AmountType {
	sort.Slice(transactions, func(i, j int) bool {
		amountI, errI := strconv.ParseFloat(transactions[i].Value, 64)
		amountJ, errJ := strconv.ParseFloat(transactions[j].Value, 64)
		if errI != nil || errJ != nil {
			return false
		}
		return amountI > amountJ
	})

	var target []m.AmountType
	countMap := make(map[string]int)
	recordMap := make(map[string][]string)

	// 找出不重複錢包地址中交易前五大的錢包地址
	for _, v := range transactions {
		if strings.EqualFold(v.From, address) {
			var amountType m.AmountType
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
	for _, v := range transactions {
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

func findTopFiveTransactionsByFrequency(address string, transactions []m.Transaction) []m.FrequencyType {
	mapTransactions := make(map[string]int)
	var topFive utils.MinHeap
	heap.Init(&topFive)

	// 計數相同錢包地址的交易頻次
	for _, v := range transactions {
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
	for _, v := range transactions {
		recordMap[v.To] = append(recordMap[v.To], v.Hash)
	}

	var target []m.FrequencyType
	for _, pair := range topFive {
		var frequencyType m.FrequencyType
		frequencyType.From = address
		frequencyType.To = pair.To
		frequencyType.Frequency = pair.Count
		frequencyType.TxHashArray = recordMap[pair.To]
		target = append(target, frequencyType)
	}

	return target
}
