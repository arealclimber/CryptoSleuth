package router

import (
	"sleuth/infras"

	"github.com/gin-gonic/gin"
)

type IRouter interface {
	InitRouter() *gin.Engine
}

type Router struct {
	infra *infras.Options
}

func NewRouter(opts *infras.Options) *Router {
	return &Router{
		infra: opts,
	}
}

func (router *Router) InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(corsMiddleware()) // 使用 CORS 中間件

	api := r.Group("/")
	api.GET("/ping", router.ping)
	api.GET("/version", router.version)
	api.GET("/wallet/transaction/history", router.getAssetTransfers)
	api.GET("/wallet/balance", router.getBalance)
	api.GET("/wallet/txhash", router.getAssetTransferByTxhash)
	return r
}
