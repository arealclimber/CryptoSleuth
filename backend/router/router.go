package router

import (
	"sleuth/infras"

	svc "sleuth/domain/interface"

	"github.com/gin-gonic/gin"
)

type IRouter interface {
	InitRouter() *gin.Engine
}

type Router struct {
	infra             *infras.Options
	walletTrackingSvc svc.IWalletTrackingSvc
}

func NewRouter(opts *infras.Options, wtSvc svc.IWalletTrackingSvc) *Router {
	return &Router{
		infra:             opts,
		walletTrackingSvc: wtSvc,
	}
}

func (router *Router) InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(corsMiddleware()) // 使用 CORS 中間件

	api := r.Group("/")
	api.GET("/ping", router.ping)
	api.GET("/version", router.version)
	api.GET("/wallet/transaction/history", router.getTransactions)
	api.GET("/wallet/balance", router.getBalance)
	api.GET("/wallet/txhash", router.getTransactionByTxhash)
	return r
}
