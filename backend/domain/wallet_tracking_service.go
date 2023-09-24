package domain

import (
	"context"
	svc_interface "sleuth/domain/interface"
	"sleuth/infras"
	m_domain_tx_his "sleuth/model/domain/transaction_history"
	m_router "sleuth/model/router"
	rep "sleuth/repository/interface"
	"sleuth/utils/errs"
	"time"
)

type WalletTrackingSvc struct {
	opts                  *infras.Options
	ExternalTimeout       time.Duration
	WalletBalanceExt      rep.IWalletBalanceExt
	TransactionHistoryExt rep.IWalletTransationHistoryExt
}

func NewWalletTrackingSvc(opts *infras.Options, wbExt rep.IWalletBalanceExt, thExt rep.IWalletTransationHistoryExt) svc_interface.IWalletTrackingSvc {
	return &WalletTrackingSvc{
		opts:                  opts,
		ExternalTimeout:       opts.Config.Server.ExternalTimeout,
		WalletBalanceExt:      wbExt,
		TransactionHistoryExt: thExt,
	}
}

// GetWalletBalance is a function that returns the balance of a wallet
func (wts WalletTrackingSvc) GetWalletBalance(address string) (*m_router.Response, *errs.ErrorResponse) {

	ctx, cancel := context.WithTimeout(context.Background(), wts.ExternalTimeout*time.Second)
	defer cancel()

	rsp, errRsp := wts.WalletBalanceExt.GetWalletBalance(ctx, address)
	if errRsp != nil {
		errRsp.Message = "Error while getting wallet balance from external API"
		return nil, errRsp
	}
	return &m_router.Response{
		BaseResp: m_router.BaseResp{
			Status:  rsp.Status,
			Type:    rsp.Type,
			Message: rsp.Message,
		},
		Result: rsp.Result,
	}, nil
}

// GetTransactionHistory is a function that returns the transaction history of a wallet
func (wts WalletTrackingSvc) GetTransactionHistory(params m_router.TransationHistoryReq) (*m_router.Response, *errs.ErrorResponse) {

	ctx, cancel := context.WithTimeout(context.Background(), wts.ExternalTimeout*time.Second)
	defer cancel()

	rsp, errRsp := wts.TransactionHistoryExt.GetWalletTransactionHistory(ctx, params.Address)
	if errRsp != nil {
		errRsp.Message = "Error while getting transaction history from external API"
		return nil, errRsp
	}
	svcRsp := m_domain_tx_his.ConvertRspToSvcModel(rsp)

	svcRsp.FilterTransactionsWithinTimeRange(params.TimeRange)

	target := &m_router.Response{
		BaseResp: m_router.BaseResp{
			Message: rsp.Message,
		},
	}
	if params.Type == "frequency" {
		TopFiveTransactionsByFrequency := svcRsp.FindTopFiveTransactionsByFrequency(params.Address)
		target.Type = "frequency"
		target.Result = TopFiveTransactionsByFrequency
	}
	if params.Type == "amount" {
		TopFiveTransactionsByAmount := svcRsp.FindTopFiveTransactionsByAmount(params.Address)
		target.Type = "amount"
		target.Result = TopFiveTransactionsByAmount
	}

	return target, nil
}

// GetTransactionHistoryByTxhash is a function that returns the transaction history of a wallet
func (wts WalletTrackingSvc) GetTransactionHistoryByTxhash(txhash string) (*m_router.Response, *errs.ErrorResponse) {

	ctx, cancel := context.WithTimeout(context.Background(), wts.ExternalTimeout*time.Second)
	defer cancel()

	rsp, errRsp := wts.TransactionHistoryExt.GetWalletTransactionHistoryByTxhash(ctx, txhash)
	if errRsp != nil {
		errRsp.Message = "Error while getting transaction history from external API"
		return nil, errRsp
	}

	target := &m_router.Response{}
	target.Result = rsp.Result

	return target, nil
}
