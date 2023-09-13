package utils

import (
	"fmt"
	"io"
	"net/http"
	"time"
)

var httpClient = &http.Client{
	Timeout: time.Second * 3, // 3秒的超時
	Transport: &http.Transport{
		MaxIdleConns:        100, // 最大閒置連線數
		IdleConnTimeout:     90 * time.Second,
		TLSHandshakeTimeout: 10 * time.Second,
	},
}

// param: apiKey, url
func Request(apiKey, url string) ([]byte, error) {

	resp, err := httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error: can't call api: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error: can't read response body: %w", err)
	}

	return body, nil
}
