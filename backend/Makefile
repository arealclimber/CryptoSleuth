.PHONY: build run

build:
	go build -ldflags "-X 'main.version=1.0' `
		-X 'main.buildNum=$(git rev-list --count HEAD)' `
		-X 'main.branch=$(git rev-parse --abbrev-ref HEAD)' `
		-X 'main.commit=$(git rev-parse HEAD)' `
		-X 'main.user=$(git config user.name)' `
		-X 'main.buildTime=$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')'" `
		-o sleuth main.go



run:
	go run .\main.go `
    -version 1.0 `
    -buildNum $(git rev-list --count HEAD) `
    -branch $(git rev-parse --abbrev-ref HEAD) `
    -commit $(git rev-parse HEAD) `
    -user $(git config user.name) `
    -buildTime $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')


