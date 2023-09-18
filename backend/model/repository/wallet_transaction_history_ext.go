package repository

type TransactionResponse struct {
	BaseResp
	Result []Transaction `json:"result"`
}

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

type GetTransactionByHashReq struct {
	Id      uint8    `json:"id"`
	JsonRpc string   `json:"jsonrpc"`
	Method  string   `json:"method"`
	Params  []string `json:"params"`
}

type GetTransactionByHashRsp struct {
	// JSON-RPC的版本
	Jsonrpc string `json:"jsonrpc"`
	// 請求的ID
	ID int `json:"id"`
	// 返回的結果
	Result *TransactionDetails `json:"result"`
	// 返回的錯誤
	Error *struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

type TransactionDetails struct {
	// 區塊的哈希值
	BlockHash string `json:"blockHash"`
	// 區塊的編號
	BlockNumber string `json:"blockNumber"`
	// 交易的哈希值
	Hash string `json:"hash"`
	// 交易的發起者地址
	From string `json:"from"`
	// 交易所消耗的Gas
	Gas string `json:"gas"`
	// Gas的價格
	GasPrice string `json:"gasPrice"`
	// 輸入的數據
	Input string `json:"input"`
	// 交易的nonce值
	Nonce string `json:"nonce"`
	// ECDSA簽名的r值
	R string `json:"r"`
	// ECDSA簽名的s值
	S string `json:"s"`
	// 交易的接受者地址
	To string `json:"to"`
	// 交易在區塊中的索引位置
	TransactionIndex string `json:"transactionIndex"`
	// 交易的類型
	Type string `json:"type"`
	// ECDSA簽名的v值
	V string `json:"v"`
	// 交易的價值
	Value string `json:"value"`
}
