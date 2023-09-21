package utils

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"time"
)

var httpClient = &http.Client{
	Transport: &http.Transport{
		MaxIdleConns:        100, // 最大閒置連線數
		IdleConnTimeout:     90 * time.Second,
		TLSHandshakeTimeout: 10 * time.Second,
	},
}

// Request 可以根據HTTP方法和body進行請求
// param: ctx, method, url, bodyData
func Request(ctx context.Context, method, url string, bodyData []byte) ([]byte, error) {
	var req *http.Request
	var err error

	if bodyData != nil {
		req, err = http.NewRequestWithContext(ctx, method, url, bytes.NewBuffer(bodyData))
	} else {
		req, err = http.NewRequestWithContext(ctx, method, url, nil)
	}
	if err != nil {
		return nil, fmt.Errorf("error: can't create request: %w", err)
	}

	if method == "POST" && bodyData != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error: can't call api: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error: can't read response body: %w", err)
	}

	return respBody, nil
}
