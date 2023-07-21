package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"sleuth/di"
	"sleuth/infras/flags"
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
	info := flags.LoadFlag()
	log.Printf("info: %v", info)
	if server, err := di.CreateServer(context.Background(), info); err != nil {
		fmt.Fprintf(os.Stderr, "Error during dependency injection: %v", err)
		os.Exit(1)
	} else if err := server.Run(); err != nil {
		log.Fatal(err)
		fmt.Fprintf(os.Stderr, "fatal error: %v", err)
		os.Exit(1)
	}
}
