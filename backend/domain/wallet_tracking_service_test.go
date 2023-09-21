package domain

import (
	"fmt"
	"math/rand"
	"reflect"
	svc_interface "sleuth/domain/interface"
	"sleuth/infras"
	"sleuth/infras/configs"
	"sleuth/infras/logger"
	m_domain_tx_his "sleuth/model/domain/transaction_history"
	m_ext "sleuth/model/repository"
	m_router "sleuth/model/router"
	"sleuth/test/mock"
	"sleuth/utils"
	"sleuth/utils/errs"
	"strconv"
	"testing"
	"time"

	"go.uber.org/mock/gomock"
)

var (
	cfg  *configs.Config
	opts *infras.Options
)

func init() {
	cfg = &configs.Config{
		Server: configs.ServerConfig{
			Debug: true,
		},
	}
	utils.ConfigPath = "example"
	apiLogger := logger.NewApiLogger(cfg)
	opts = &infras.Options{
		Config: cfg,
		Logger: apiLogger,
	}
}

// create mock repositories
// @param mockCtl controller
// @result MockReps model
func getMockReps(mockCtl *gomock.Controller) mockReps {
	return mockReps{
		mockiWalletBalanceExt:           mock.NewMockIWalletBalanceExt(mockCtl),
		mockiWalletTransationHistoryExt: mock.NewMockIWalletTransationHistoryExt(mockCtl),
	}
}

// create new Wallet Tracking service
// @param cfg config
// @param mockReps mock reps
// @result WalletTrackingService model
func newWalletTrackingService(cfg *configs.Config, mockReps mockReps) svc_interface.IWalletTrackingSvc {
	return NewWalletTrackingSvc(opts, mockReps.mockiWalletBalanceExt, mockReps.mockiWalletTransationHistoryExt)
}

// mock repositories struct
type mockReps struct {
	mockiWalletBalanceExt           *mock.MockIWalletBalanceExt
	mockiWalletTransationHistoryExt *mock.MockIWalletTransationHistoryExt
}

func TestWalletTrackingService_GetWalletBalance(t *testing.T) {
	t.Parallel()
	address := "0x00000"
	mockResponse := &m_ext.Response{
		BaseResp: m_ext.BaseResp{
			Message: "OK",
		},
		Result: "19795659924695455878",
	}
	want := &m_router.Response{
		BaseResp: m_router.BaseResp{
			Message: "OK",
		},
		Result: "19795659924695455878",
	}
	type args struct {
		arg string
	}
	tests := []struct {
		name    string
		prepare func(f *mockReps)
		args    args
		want    *m_router.Response
	}{
		{
			name: "GetWalletBalance",
			prepare: func(f *mockReps) {
				gomock.InOrder(
					f.mockiWalletBalanceExt.EXPECT().GetWalletBalance(gomock.Any(), address).Return(mockResponse, nil),
				)
			},
			args: args{arg: address},
			want: want,
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			mockCtl := gomock.NewController(t)
			defer mockCtl.Finish()
			f := getMockReps(mockCtl)
			if tt.prepare != nil {
				tt.prepare(&f)
			}
			walletTrackingSvc := newWalletTrackingService(cfg, f)
			if got, _ := walletTrackingSvc.GetWalletBalance(tt.args.arg); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("WalletTrackingService.GetWalletBalance() = %v, want = %v", got, tt.want)
			}
		})
	}
}

func TestWalletTrackingService_GetTransactionHistory(t *testing.T) {
	t.Parallel()

	address := "0x00000"
	mockExtResponse, frequencyRsp := generateFrequencyRsp(address)

	tests := []struct {
		name         string
		req          m_router.TransationHistoryReq
		mockPrepare  func(f *mockReps)
		wantResponse *m_router.Response
		wantErr      *errs.ErrorResponse
	}{
		{
			name: "TestFrequencyType",
			req: m_router.TransationHistoryReq{
				Address:   address,
				TimeRange: 60,
				Type:      "frequency",
			},
			mockPrepare: func(f *mockReps) {
				gomock.InOrder(
					f.mockiWalletTransationHistoryExt.EXPECT().GetWalletTransactionHistory(gomock.Any(), address).Return(mockExtResponse, nil),
				)
			},
			wantResponse: &m_router.Response{
				BaseResp: m_router.BaseResp{Type: "frequency", Message: "OK"},
				Result:   frequencyRsp,
			},
			wantErr: nil,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			mockCtl := gomock.NewController(t)
			defer mockCtl.Finish()
			f := getMockReps(mockCtl)
			if tt.mockPrepare != nil {
				tt.mockPrepare(&f)
			}
			walletTrackingSvc := newWalletTrackingService(cfg, f)
			if got, _ := walletTrackingSvc.GetTransactionHistory(tt.req); !reflect.DeepEqual(got, tt.wantResponse) {
				t.Errorf("WalletTrackingService.GetWalletBalance() = %v, want = %v", got, tt.wantResponse)
			}
		})
	}

}

func generateFrequencyRsp(address string) (*m_ext.TransactionResponse, []m_domain_tx_his.FrequencyType) {
	mockExtResponse := generateMockTransactionResponse(address)
	convertedResponse := m_domain_tx_his.ConvertRspToSvcModel(mockExtResponse)
	convertedResponse.FilterTransactionsWithinTimeRange(60)
	return mockExtResponse, convertedResponse.FindTopFiveTransactionsByFrequency(address)
}

func generateMockTransactionResponse(address string) *m_ext.TransactionResponse {
	target := &m_ext.TransactionResponse{
		BaseResp: m_ext.BaseResp{
			Message: "OK",
		},
		Result: []m_ext.Transaction{},
	}
	for i := 0; i < 10; i++ {
		transaction := m_ext.Transaction{
			TimeStamp: strconv.FormatInt(time.Now().Unix(), 10),
			Hash:      fmt.Sprintf("0xhash%x", i),
			From:      address,
			To:        randomChoiceTo(),
			Value:     strconv.Itoa(utils.GenerateRangeNum(1, 5000)),
		}
		target.Result = append(target.Result, transaction)
	}
	return target
}

func randomChoiceTo() string {
	switch rand.Intn(3) { // 生成0、1或2的隨機數
	case 0:
		return "address1"
	case 1:
		return "address2"
	default:
		return "address3"
	}
}
