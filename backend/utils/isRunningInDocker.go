package utils

import (
	"os"
)

func IsRunningInDocker() bool {
	_, err := os.Stat("/.dockerenv")
	return err == nil
}
