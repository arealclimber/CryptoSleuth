package service_interface

import (
	m_router "sleuth/model/router"
	"sleuth/utils/errs"
)

//go:generate mockgen -destination=../../test/mock/iwallet_tracking_mock_svc.go -package=mock sleuth/domain/interface IWalletTrackingSvc
type IWalletTrackingSvc interface {
	GetWalletBalance(address string) (*m_router.Response, *errs.ErrorResponse)
	GetTransactionHistory(req m_router.TransationHistoryReq) (*m_router.Response, *errs.ErrorResponse)
	GetTransactionHistoryByTxhash(txhash string) (*m_router.Response, *errs.ErrorResponse)
}
