package utils

import (
	"backend/spellit/types"
)

func NewRound(lobby *types.Lobby) {
	lobby.Word = ""
}
