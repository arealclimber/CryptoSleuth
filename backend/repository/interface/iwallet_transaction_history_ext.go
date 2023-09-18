package repository_interface

import (
	"context"
	m "sleuth/models/repository"
	"sleuth/utils/errs"
)

// go:generate mockgen -destination=../../test/mock/iwallet_transaction_history_mock_ext.go -package=mock sleuth/repository/interface ITransationHistoryExt
type ITransationHistoryExt interface {
	GetTransactionHistory(ctx context.Context, address string) (*m.TransactionResponse, *errs.ErrorResponse)
}
