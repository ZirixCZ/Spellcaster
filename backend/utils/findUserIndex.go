package utils

import "backend/spellit/types"

func FindUserIndex(lobby *types.Lobby, username string) (int, bool) {
	users := lobby.User
	for i, user := range users {
		if user.UserName == username {
			return i, true
		}
	}
	return 0, false
}
