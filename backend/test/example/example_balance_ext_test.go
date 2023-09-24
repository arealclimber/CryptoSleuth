package example

import (
	"context"
	"fmt"
)

func ExampleWalletBalanceExt_GetWalletBalance() {
	ext := newWalletBalanceExt()

	result, err := ext.GetWalletBalance(context.Background(), address)

	fmt.Println(result.Message)
	fmt.Println(err)
	// Output:
	// OK
	// <nil>
}
