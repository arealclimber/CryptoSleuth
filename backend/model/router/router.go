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

type TransationHistoryReq struct {
	Address   string `json:"address"`
	TimeRange int    `json:"time_range"`
	Type      string `json:"req_type"`
}
