package utils

import "math/big"

func ConvertWeiToEther(weiStr string) *big.Float {
	wei := new(big.Int)
	wei.SetString(weiStr, 10)

	ether := new(big.Float).SetInt(wei)
	ether.Quo(ether, new(big.Float).SetFloat64(1e18))

	return ether
}
