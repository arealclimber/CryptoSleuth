

SERVER=ec2-54-199-12-7.ap-northeast-1.compute.amazonaws.com

deploy:
	./deploy.sh $(SERVER)

generate:
	mockgen -destination=test/mock/iwallet_tracking_mock_svc.go -package=mock sleuth/domain/interface IWalletTrackingSvc
	mockgen -destination=test/mock/iwallet_balance_mock_ext.go -package=mock sleuth/repository/interface IWalletBalanceExt
	mockgen -destination=test/mock/iwallet_transaction_history_mock_ext.go -package=mock sleuth/repository/interface IWalletTransationHistoryExt


.PHONY: deploy generate



