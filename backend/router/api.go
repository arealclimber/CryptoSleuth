package router

import (
	"net/http"
	m_router "sleuth/model/router"
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

	req := m_router.TransationHistoryReq{
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

	rsp, errRsp := router.walletTrackingSvc.GetTransactionHistoryByTxhash(txhash)
	if errRsp != nil {
		c.JSON(errRsp.StatusCode, errRsp)
		return
	}

	c.JSON(http.StatusOK, rsp)
}
