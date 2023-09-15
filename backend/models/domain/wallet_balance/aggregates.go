package wallet_balance

// WalletBalance represents the balance of a particular address.
type WalletBalance struct {
	Address Address `json:"address"`
	Amount  Amount  `json:"balance"`
}
