package di

import (
	"context"
	"sleuth/app"
	"sleuth/infras"
	"sleuth/infras/logger"
	"sleuth/models/commons"
	"sleuth/router"
)

// create server
// @result server and error
func CreateServer(ctx context.Context, info *commons.SystemInfo) (*app.Server, error) {
	config := infras.ProvideConfig()
	apiLogger := logger.NewApiLogger(config)
	options := &infras.Options{
		Ctx:    ctx,
		Info:   info,
		Config: config,
		Logger: apiLogger,
	}
	router := router.NewRouter(options)
	Server := app.NewServer(options, router)
	return Server, nil
}
