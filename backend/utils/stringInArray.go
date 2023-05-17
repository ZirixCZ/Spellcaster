package utils

import (
	"strings"
)

func StringInArray(array []string, target string) bool {
	for _, element := range array {

		if strings.Contains(element, target) {
			return true
		}
	}
	return false
}
