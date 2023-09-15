package service_interface

import (
	m "sleuth/models/repository"
	"sleuth/utils/errs"
)

//go:generate mockgen -destination=../../test/mock/iwallet_tracking_mock_svc.go -package=mock sleuth/service/interface IWalletTrackingSvc
type IWalletTrackingSvc interface {
	GetWalletBalance(address string) (*m.Response, *errs.ErrorResponse)
}
