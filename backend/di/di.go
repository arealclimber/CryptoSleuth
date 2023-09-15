package di

import (
	"context"
	"sleuth/app"
	"sleuth/domain"
	"sleuth/infras"
	"sleuth/infras/logger"
	"sleuth/models/commons"
	ext "sleuth/repository/external"
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
	balanceExt := ext.NewWalletBalanceExt(options)
	walletTrackingSvc := domain.NewWalletTrackingSvc(options, balanceExt)
	router := router.NewRouter(options, walletTrackingSvc)
	Server := app.NewServer(options, router)
	return Server, nil
}
