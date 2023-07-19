package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Request struct {
	Jsonrpc string  `json:"jsonrpc"`
	Method  string  `json:"method"`
	Params  []Param `json:"params"`
	ID      int     `json:"id"`
}

type Param struct {
	FromBlock   string   `json:"fromBlock"`
	Category    []string `json:"category"`
	FromAddress string   `json:"fromAddress"`
}

func main() {
	router := gin.Default()

	router.GET("/wallet/transaction/history", getAssetTransfers)

	router.Run() // listen and serve on 0.0.0.0:8080
}

func getAssetTransfers(c *gin.Context) {
	address := c.Query("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Address parameter is required",
		})
		return
	}

	requestBody := &Request{
		Jsonrpc: "2.0",
		Method:  "alchemy_getAssetTransfers",
		Params: []Param{
			{
				FromBlock:   "0x0",
				Category:    []string{"external", "erc20", "erc721"},
				FromAddress: address,
			},
		},
		ID: 0,
	}
	jsonValue, _ := json.Marshal(requestBody)

	resp, err := http.Post("https://eth-mainnet.g.alchemy.com/v2/key", "application/json", bytes.NewBuffer(jsonValue))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result map[string]interface{}
	json.Unmarshal(body, &result)

	c.JSON(http.StatusOK, result)
}
