package flags

import (
	"flag"
	model_com "sleuth/models/commons"
)

func LoadFlag() *model_com.SystemInfo {
	version := flag.String("version", "", "Version number")
	buildNum := flag.String("buildNum", "", "Build number")
	branch := flag.String("branch", "", "Branch name")
	commit := flag.String("commit", "", "Commit hash")
	user := flag.String("user", "", "User who build")
	buildTime := flag.String("buildTime", "", "Build time")

	flag.Parse()

	return &model_com.SystemInfo{
		Version:   *version,
		BuildNum:  *buildNum,
		Branch:    *branch,
		Commit:    *commit,
		BuildUser: *user,
		BuildTime: *buildTime,
	}
}
