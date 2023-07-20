package router

type Request struct {
	Jsonrpc string  `json:"jsonrpc"`
	Method  string  `json:"method"`
	Params  []Param `json:"params"`
	ID      int     `json:"id"`
}

type Param struct {
	FromBlock   string   `json:"fromBlock"`
	Category    []string `json:"category"`
	FromAddress string   `json:"fromAddress"`
}
