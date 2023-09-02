package router

import (
	"crypto/sha256"
	"encoding/hex"
	"math/rand"
	m "sleuth/models/router"
	"testing"
)

func randomHash() string {
	randBytes := make([]byte, 10)
	rand.Read(randBytes)
	hasher := sha256.New()
	hasher.Write(randBytes)
	return hex.EncodeToString(hasher.Sum(nil))
}

func TestFindTopFiveTransactionsByFrequency(t *testing.T) {
	// 定義一個Transaction數組作為範例輸入
	transactions := []m.Transaction{
		{From: "A", To: "B", Hash: "hash1"},
		{From: "A", To: "B", Hash: "hash2"},
		{From: "A", To: "C", Hash: "hash3"},
		{From: "A", To: "D", Hash: "hash4"},
		{From: "A", To: "E", Hash: "hash5"},
		{From: "A", To: "B", Hash: "hash6"},
		{From: "A", To: "E", Hash: "hash7"},
	}

	// 調用函數
	result := findTopFiveTransactionsByFrequency("A", transactions)

	// 預期的頻次是B:3, C:1, D:1, E:2
	expectedFrequency := map[string]int{
		"B": 3,
		"C": 1,
		"D": 1,
		"E": 2,
	}

	// 檢查回傳的交易是否包含正確的頻次
	for _, transaction := range result {
		if *transaction.Frequency != expectedFrequency[transaction.To] {
			t.Errorf("Frequency mismatch. Expected %d, got %d for To address %s",
				expectedFrequency[transaction.To], *transaction.Frequency, transaction.To)
		}
	}

	// 檢查是否回傳最頻繁的五個地址，這裡我們僅有四個不同的To地址，所以預期是四個。
	if len(result) != 4 {
		t.Errorf("Expected length 4, got %d", len(result))
	}
}
