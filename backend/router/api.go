package router

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	m "sleuth/models/router"
	"sleuth/utils"
	"sleuth/utils/errs"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (router *Router) ping(c *gin.Context) {
	c.JSON(200, gin.H{"message": "pong"})
}

func (router *Router) version(c *gin.Context) {
	c.JSON(200, router.infra.Info)
}

func (router *Router) getTransactions(c *gin.Context) {
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

	req := m.TransationHistory{
		Address:   address,
		TimeRange: timeRange,
		Type:      reqType,
	}

	rsp, errRsp := router.walletTrackingSvc.GetTransactionHistory(req)
	if errRsp != nil {
		c.JSON(errRsp.StatusCode, errRsp)
		return
	}

	c.JSON(http.StatusOK, rsp)
}

func (router *Router) getBalance(c *gin.Context) {
	var errRsp *errs.ErrorResponse

	address := c.Query("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, &errs.ErrorResponse{
			Message: "Address parameter is required",
		})
		return
	}

	rsp, errRsp := router.walletTrackingSvc.GetWalletBalance(address)
	if errRsp != nil {
		c.JSON(errRsp.StatusCode, errRsp)
		return
	}

	c.JSON(http.StatusOK, rsp)
}

func (router *Router) getTransactionByTxhash(c *gin.Context) {
	txhash := c.Query("txhash")
	if txhash == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "txhash parameter is required",
		})
		return
	}

	url := "https://eth-mainnet.g.alchemy.com/v2/" + router.infra.Config.Alchemy.Token
	reqBody := m.GetTransactionByHashReq{
		Id:      1,
		JsonRpc: "2.0",
		Method:  "eth_getTransactionByHash",
		Params:  []string{txhash},
	}
	body, _ := json.Marshal(reqBody)

	ctx := context.Background()
	body, err := utils.Request(ctx, "POST", url, body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": fmt.Sprintf("error: can't call etherscan api: %s", err),
		})
		return
	}

	var target m.Response
	var rsp m.GetTransactionByHashResp
	err = json.Unmarshal(body, &rsp)
	if err != nil {
		log.Printf("error: can't unmarshal JSON: %s", err)
	}

	if rsp.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("error: %s", rsp.Error.Message),
		})
		return
	}
	target.Result = rsp.Result

	c.JSON(http.StatusOK, target)
}
