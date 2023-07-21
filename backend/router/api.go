package router

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	r_model "sleuth/models/router"

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
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Address parameter is required",
		})
		return
	}

	requestBody := &r_model.Request{
		Jsonrpc: "2.0",
		Method:  "alchemy_getAssetTransfers",
		Params: []r_model.Param{
			{
				FromBlock:   "0x0",
				Category:    []string{"external", "erc20", "erc721"},
				FromAddress: address,
			},
		},
		ID: 0,
	}
	jsonValue, _ := json.Marshal(requestBody)

	resp, err := http.Post("https://eth-mainnet.g.alchemy.com/v2/"+router.infra.Config.Alchemy.Token, "application/json", bytes.NewBuffer(jsonValue))

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
