package utils

import (
	"backend/spellit/types"
	"strings"
)

func FindUserIndex(lobby *types.Lobby, username string) (int, bool) {
	users := lobby.User
	for i, user := range users {
		if strings.Compare(user.UserName, username) == 0 {
			return i, true
		}
	}
	return 0, false
}
