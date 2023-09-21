package transaction_history

import (
	m_rep "sleuth/model/repository"
	"strconv"
	"testing"
	"time"
)

func TestFilterTransactionsWithinTimeRange(t *testing.T) {
	now := time.Now()
	oneDayAgo := now.Add(-24 * time.Hour).Unix()
	twoDaysAgo := now.Add(-48 * time.Hour).Unix()

	txResp := &TransactionResponse{
		Result: []m_rep.Transaction{
			{TimeStamp: strconv.FormatInt(oneDayAgo, 10)},
			{TimeStamp: strconv.FormatInt(twoDaysAgo, 10)},
		},
	}

	txResp.FilterTransactionsWithinTimeRange(24 * 3600) // 過濾24小時以外的交易

	if len(txResp.Result) != 1 {
		t.Fatalf("Expected 1 transaction, but got %d", len(txResp.Result))
	}
	if txResp.Result[0].TimeStamp != strconv.FormatInt(oneDayAgo, 10) {
		t.Errorf("Expected transaction timestamp %s, but got %s", strconv.FormatInt(oneDayAgo, 10), txResp.Result[0].TimeStamp)
	}
}

func TestFindTopFiveTransactionsByAmount(t *testing.T) {
	// 準備資料
	address := "0xAddress"
	txResp := &TransactionResponse{
		Result: []m_rep.Transaction{
			{From: address, To: "0xTo1", Value: "50", Hash: "hash1"},
			{From: address, To: "0xTo2", Value: "100", Hash: "hash2"},
			{From: address, To: "0xTo3", Value: "30", Hash: "hash3"},
			{From: address, To: "0xTo2", Value: "10", Hash: "hash4"},
			{From: address, To: "0xTo4", Value: "90", Hash: "hash5"},
			{From: address, To: "0xTo5", Value: "70", Hash: "hash6"},
			{From: "0xAnotherAddress", To: "0xTo1", Value: "20", Hash: "hash7"},
		},
	}

	result := txResp.FindTopFiveTransactionsByAmount(address)

	if len(result) != 5 {
		t.Fatalf("Expected 5 results, but got %d", len(result))
	}

	// 驗證金額排序是否正確
	expectedTos := []string{"0xTo2", "0xTo4", "0xTo5", "0xTo1", "0xTo3"}
	for i, r := range result {
		if r.To != expectedTos[i] {
			t.Errorf("Expected TO address %s, but got %s", expectedTos[i], r.To)
		}
	}

	// 驗證TxHashArray是否正確
	if len(result[0].TxHashArray) != 2 || result[0].TxHashArray[0] != "hash2" || result[0].TxHashArray[1] != "hash4" {
		t.Errorf("Expected TxHashArray for 0xTo2 to be [hash2, hash4], but got %v", result[0].TxHashArray)
	}
}

func TestFindTopFiveTransactionsByFrequency(t *testing.T) {
	// 準備資料
	address := "0xAddress"
	txResp := &TransactionResponse{
		Result: []m_rep.Transaction{
			{From: address, To: "0xTo1", Hash: "hash1"},
			{From: address, To: "0xTo2", Hash: "hash2"},
			{From: address, To: "0xTo3", Hash: "hash3"},
			{From: address, To: "0xTo2", Hash: "hash4"},
			{From: address, To: "0xTo4", Hash: "hash5"},
			{From: address, To: "0xTo5", Hash: "hash6"},
			{From: address, To: "0xTo5", Hash: "hash7"},
			{From: address, To: "0xTo1", Hash: "hash8"},
		},
	}

	result := txResp.FindTopFiveTransactionsByFrequency(address)

	if len(result) != 5 {
		t.Fatalf("Expected 5 results, but got %d", len(result))
	}

	for _, freqType := range result {
		if freqType.To == "0xTo1" {
			if freqType.Frequency != 2 || len(freqType.TxHashArray) != 2 || freqType.TxHashArray[0] != "hash1" || freqType.TxHashArray[1] != "hash8" {
				t.Errorf("Data for 0xTo1 is incorrect.")
			}
		}
	}
}
