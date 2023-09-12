package router

type Transaction struct {
	BlockNumber       string `json:"blockNumber"`
	TimeStamp         string `json:"timeStamp"`
	Hash              string `json:"hash"`
	Nonce             string `json:"nonce"`
	BlockHash         string `json:"blockHash"`
	TransactionIndex  string `json:"transactionIndex"`
	From              string `json:"from"`
	To                string `json:"to"`
	Value             string `json:"value"`
	Gas               string `json:"gas"`
	GasPrice          string `json:"gasPrice"`
	IsError           string `json:"isError"`
	TxreceiptStatus   string `json:"txreceipt_status"`
	Input             string `json:"input"`
	ContractAddress   string `json:"contractAddress"`
	CumulativeGasUsed string `json:"cumulativeGasUsed"`
	GasUsed           string `json:"gasUsed"`
	Confirmations     string `json:"confirmations"`
	MethodId          string `json:"methodId"`
	FunctionName      string `json:"functionName"`
	Frequency         *int   `json:"frequency,omitempty"` // 紀錄該地址交易的頻次
}

type BaseResp struct {
	Status  string `json:"-"`
	Type    string `json:"type"`
	Message string `json:"message"`
}

type TransactionResponse struct {
	BaseResp
	Result interface{} `json:"result"`
}

type BalanceResponse struct {
	BaseResp
	Result string `json:"result"`
}

type AmountResponse struct {
	BaseResp
	Result []AmountType `json:"result"`
}

type AmountType struct {
	From           string   `json:"from"`
	To             string   `json:"to"`
	BlockHashArray []string `json:"block_hash_array"`
	Value          string   `json:"value"`
}
