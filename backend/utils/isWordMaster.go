package utils

import (
	"backend/spellit/types"
)

func IsWordMaster(lobby *types.Lobby, username string) bool {
	return lobby.Round.CurrentWordMaster == username
}
