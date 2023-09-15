package domain

import (
	"context"
	"sleuth/infras"
	m "sleuth/models/repository"
	rep "sleuth/repository/interface"
	"sleuth/utils/errs"
	"time"
)

type WalletTrackingSvc struct {
	opts             *infras.Options
	ExternalTimeout  time.Duration
	WalletBalanceExt rep.IWalletBalanceExt
}

func NewWalletTrackingSvc(opts *infras.Options, wbExt rep.IWalletBalanceExt) *WalletTrackingSvc {
	return &WalletTrackingSvc{
		opts:             opts,
		ExternalTimeout:  opts.Config.Server.ExternalTimeout,
		WalletBalanceExt: wbExt,
	}
}

// GetWalletBalance is a function that returns the balance of a wallet
func (wtDeps WalletTrackingSvc) GetWalletBalance(address string) (*m.Response, *errs.ErrorResponse) {

	ctx, cancel := context.WithTimeout(context.Background(), wtDeps.ExternalTimeout*time.Second)
	defer cancel()

	res, errRsp := wtDeps.WalletBalanceExt.GetWalletBalance(ctx, address)
	if errRsp != nil {
		return nil, errRsp
	}
	return res, nil
}
