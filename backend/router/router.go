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

	api := r.Group("/")
	api.GET("/ping", router.ping)
	api.GET("/wallet/transaction/history", router.getAssetTransfers)

	return r
}
