package example

import (
	"context"
	"log"
	"sleuth/infras"
	"sleuth/infras/configs"
	"sleuth/infras/logger"
	ext "sleuth/repository/external"
	rep_interface "sleuth/repository/interface"
	"sleuth/utils"
)

func newTransactionHistoryExt() rep_interface.IWalletTransationHistoryExt {
	utils.ConfigPath = "example"
	cfgFile, err := configs.LoadConfig(utils.GetConfigPath())
	if err != nil {
		log.Fatalf("LoadConfig: %v", err)
	}
	cfg, _ := configs.ParseConfig(cfgFile)
	apiLogger := logger.NewApiLogger(cfg)
	options := &infras.Options{
		Ctx:    context.Background(),
		Info:   nil,
		Config: cfg,
		Logger: apiLogger,
	}
	return ext.NewTransactionHistoryExt(options)
}

func newWalletBalanceExt() rep_interface.IWalletBalanceExt {
	utils.ConfigPath = "example"
	cfgFile, err := configs.LoadConfig(utils.GetConfigPath())
	if err != nil {
		log.Fatalf("LoadConfig: %v", err)
	}
	cfg, _ := configs.ParseConfig(cfgFile)
	apiLogger := logger.NewApiLogger(cfg)
	options := &infras.Options{
		Ctx:    context.Background(),
		Info:   nil,
		Config: cfg,
		Logger: apiLogger,
	}
	return ext.NewWalletBalanceExt(options)
}
