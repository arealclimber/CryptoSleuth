package example

import (
	"context"
	"fmt"
)

var (
	address = "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"
	txhash  = "0x592c8951f958ee12ee217e242d51c76cb36357d1232e238e6b3782d0045eb7a6"
)

func ExampleTransationHistoryExt_GetWalletTransactionHistory() {
	ext := newTransactionHistoryExt()

	result, err := ext.GetWalletTransactionHistory(context.Background(), address)

	fmt.Println(result.Message)
	fmt.Println(err)
	// Output:
	// OK
	// <nil>
}

func ExampleTransationHistoryExt_GetWalletTransactionHistoryByTxhash() {
	ext := newTransactionHistoryExt()

	result, err := ext.GetWalletTransactionHistoryByTxhash(context.Background(), txhash)

	fmt.Println(result.Result.Hash == txhash)
	fmt.Println(err)
	// Output:
	// true
	// <nil>
}
