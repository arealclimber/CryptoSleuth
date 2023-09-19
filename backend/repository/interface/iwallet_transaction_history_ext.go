package repository_interface

import (
	"context"
	m "sleuth/model/repository"
	"sleuth/utils/errs"
)

//go:generate mockgen -destination=../../test/mock/iwallet_transaction_history_mock_ext.go -package=mock sleuth/repository/interface IWalletTransationHistoryExt
type IWalletTransationHistoryExt interface {
	GetWalletTransactionHistory(ctx context.Context, address string) (*m.TransactionResponse, *errs.ErrorResponse)
	GetWalletTransactionHistoryByTxhash(ctx context.Context, txhash string) (*m.GetTransactionByHashRsp, *errs.ErrorResponse)
}
