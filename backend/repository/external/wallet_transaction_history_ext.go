package external

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sleuth/infras"
	m "sleuth/models/repository"
	rep_interface "sleuth/repository/interface"
	"sleuth/utils"
	"sleuth/utils/errs"
)

type TransationHistoryExt struct {
	opts *infras.Options
}

func NewTransactionHistoryExt(opts *infras.Options) rep_interface.ITransationHistoryExt {
	return &TransationHistoryExt{
		opts: opts,
	}
}

func (thExt *TransationHistoryExt) GetTransactionHistory(ctx context.Context, address string) (*m.TransactionResponse, *errs.ErrorResponse) {
	url := "https://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=" + thExt.opts.Config.Etherscan.Token

	body, err := utils.Request(ctx, "GET", url, nil)
	if err != nil {
		return nil, &errs.ErrorResponse{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("error: can't call etherscan api: %s", err),
		}
	}

	var rsp m.TransactionResponse
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
