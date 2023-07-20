package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"sleuth/di"
	model_com "sleuth/models/commons"
)

var (
	LOCALDEBUG = true
	fVersion   string
	fHelp      string
	version    string = "development"
	buildNum   string
	buildTime  string
	user       string
	branch     string
	commit     string
)

func main() {
	info := &model_com.SystemInfo{
		Version:   version,
		BuildNum:  buildNum,
		Branch:    branch,
		Commit:    commit,
		BuildUser: user,
		BuildTime: buildTime,
	}

	if server, err := di.CreateServer(context.Background(), info); err != nil {
		fmt.Fprintf(os.Stderr, "Error during dependency injection: %v", err)
		os.Exit(1)
	} else if err := server.Run(); err != nil {
		log.Fatal(err)
		fmt.Fprintf(os.Stderr, "fatal error: %v", err)
		os.Exit(1)
	}
}
