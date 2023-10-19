package repository

type BaseResp struct {
	Status  string `json:"-"`
	Type    string `json:"type,omitempty"`
	Message string `json:"message"`
}

type Response struct {
	BaseResp
	Result string `json:"result"`
}

type ExchangeRateRsp struct {
	Ethereum struct {
		USD float64 `json:"usd"`
	} `json:"ethereum"`
}
