package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func isRunningInDocker() bool {
	_, err := os.Stat("/.dockerenv")
	return err == nil
}

func IsValidWord(word string) bool {
	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting working directory:", err)
		return false
	}

	wordListPath := ""
	if isRunningInDocker() {
		wordListPath = "/app/storage/wordlist.txt"

	} else {
		wordListPath = filepath.Join(wd, "storage", "wordlist.txt")
	}

	wordListBytes, err := os.ReadFile(wordListPath)
	if err != nil {
		fmt.Println("Error loading wordlist file:", err)
		return false
	}

	wordList := strings.Split(string(wordListBytes), "\n")

	word = strings.ToLower(word)

	for _, w := range wordList {
		if w == word {
			return true
		}
	}
	return false
}
