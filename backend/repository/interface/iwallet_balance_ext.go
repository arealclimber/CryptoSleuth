package repository_interface

import (
	"context"
	m "sleuth/models/repository"
	"sleuth/utils/errs"
)

//go:generate mockgen -destination=../../test/mock/iwallet_balance_mock_ext.go -package=mock sleuth/repository/interface IWalletBalanceExt
type IWalletBalanceExt interface {
	GetWalletBalance(ctx context.Context, address string) (*m.Response, *errs.ErrorResponse)
}
