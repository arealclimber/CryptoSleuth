package example

import (
	"context"
	"fmt"
	"log"
)

func ExampleWalletBalanceExt_GetWalletBalance() {
	ext := newWalletBalanceExt()

	result, err := ext.GetWalletBalance(context.Background(), address)

	log.Println(result.Result)
	fmt.Println(result.Message)
	fmt.Println(err)
	// Output:
	// OK
	// <nil>
}
