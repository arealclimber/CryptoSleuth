package repository

type BaseResp struct {
	Status  string `json:"-"`
	Type    string `json:"type,omitempty"`
	Message string `json:"message"`
}

type Response struct {
	BaseResp
	Result interface{} `json:"result"`
}
