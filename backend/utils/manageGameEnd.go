package utils

import (
	"backend/spellit/types"
)

// true if game is over
func ManageGameEnd(lobby *types.Lobby) bool {
	return lobby.Round.RoundsPlayed > lobby.Round.RoundsCount
}
