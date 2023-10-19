package router

type BaseResp struct {
	Status  string `json:"-"`
	Type    string `json:"type,omitempty"`
	Message string `json:"message"`
}

type Response struct {
	BaseResp
	Result interface{} `json:"result"`
}

type BalanceRsp struct {
	BaseResp
	Result BalanceModel `json:"result"`
}

type BalanceModel struct {
	Wei string `json:"wei"`
	USD string `json:"usd,omitempty"`
}

type TransationHistoryReq struct {
	Address   string `json:"address"`
	TimeRange int    `json:"time_range"`
	Type      string `json:"req_type"`
}
