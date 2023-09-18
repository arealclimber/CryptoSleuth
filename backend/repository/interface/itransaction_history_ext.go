package repository_interface

import (
	"context"
	m "sleuth/model/repository"
	"sleuth/utils/errs"
)

// go:generate mockgen -destination=../../test/mock/itransaction_history_mock_ext.go -package=mock sleuth/repository/interface ITransationHistoryExt
type ITransationHistoryExt interface {
	GetTransactionHistory(ctx context.Context, address string) (*m.TransactionResponse, *errs.ErrorResponse)
	GetTransactionHistoryByTxhash(ctx context.Context, txhash string) (*m.GetTransactionByHashRsp, *errs.ErrorResponse)
}
