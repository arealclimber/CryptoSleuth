package router

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	m "sleuth/models/router"
	"sort"
	"strconv"
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
	timeRange, err := strconv.Atoi(tr)

	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Address parameter is required",
		})
		return
	}
	url := "https://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=" + router.infra.Config.Etherscan.Token

	resp, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("error: can't read response body: %s", err)
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

	transactionsWithinRange := filterTransactionsWithinTimeRange(rsp, timeRange)
	TopFiveTransactionsByAmount := findTopFiveTransactionsByAmount(transactionsWithinRange)
	rsp.Result = TopFiveTransactionsByAmount

	c.JSON(http.StatusOK, rsp)
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

	resp, err := http.Get(url)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("error: can't read response body: %s", err)
	}

	var rsp m.BalanceResponse
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

	for i, v := range transactions.Result {
		timeStamp, err := strconv.ParseInt(v.TimeStamp, 10, 64)
		if err == nil {
			t := time.Unix(timeStamp, 0)

			secondsDiff := now - t.Unix()

			if secondsDiff <= int64(timeRange) {
				target = append(target, transactions.Result[i])
			} else {
				break
			}
		}
	}

	return target
}

func findTopFiveTransactionsByAmount(transactions []m.Transaction) []m.Transaction {
	sort.Slice(transactions, func(i, j int) bool {
		amountI, errI := strconv.ParseFloat(transactions[i].Value, 64)
		amountJ, errJ := strconv.ParseFloat(transactions[j].Value, 64)
		if errI != nil || errJ != nil {
			return false
		}
		return amountI > amountJ
	})

	var target []m.Transaction
	for i := 0; i < len(transactions) && i < 5; i++ {
		target = append(target, transactions[i])
	}

	return target
}
