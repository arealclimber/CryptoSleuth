package external

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sleuth/infras"
	m "sleuth/model/repository"
	rep_interface "sleuth/repository/interface"
	"sleuth/utils"
	"sleuth/utils/errs"
)

type WalletBalanceExt struct {
	opts *infras.Options
}

func NewWalletBalanceExt(opts *infras.Options) rep_interface.IWalletBalanceExt {
	return &WalletBalanceExt{
		opts: opts,
	}
}

func (wbExt *WalletBalanceExt) GetWalletBalance(ctx context.Context, address string) (*m.Response, *errs.ErrorResponse) {
	url := "https://api.etherscan.io/api?module=account&action=balance&address=" + address + "&tag=latest&apikey=" + wbExt.opts.Config.Etherscan.Token

	body, err := utils.Request(ctx, "GET", url, nil)
	if err != nil {
		return nil, &errs.ErrorResponse{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("error: can't call etherscan api: %s", err),
		}
	}

	var rsp m.Response
	err = json.Unmarshal(body, &rsp)
	if err != nil {
		log.Printf("error: can't unmarshal JSON: %s", err)
	}

	if rsp.Message != "OK" {
		return nil, &errs.ErrorResponse{
			StatusCode: http.StatusBadRequest,
			Message:    fmt.Sprintf("error: %s", rsp.Message),
		}
	}

	return &rsp, nil
}
