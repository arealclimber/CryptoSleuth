package service_interface

import (
	m_router "sleuth/models/router"
	"sleuth/utils/errs"
)

//go:generate mockgen -destination=../../test/mock/iwallet_tracking_mock_svc.go -package=mock sleuth/service/interface IWalletTrackingSvc
type IWalletTrackingSvc interface {
	GetWalletBalance(address string) (*m_router.Response, *errs.ErrorResponse)
	GetTransactionHistory(req m_router.TransationHistory) (*m_router.Response, *errs.ErrorResponse)
}
