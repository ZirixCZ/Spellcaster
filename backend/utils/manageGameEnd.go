package utils

import (
	"backend/spellit/types"
	"fmt"
)

// true if game is over
func ManageGameEnd(lobby *types.Lobby) bool {
	fmt.Println("ManageGasmeEnd", lobby.Round.RoundsPlayed, lobby.Round.RoundsCount)
	return lobby.Round.RoundsPlayed >= lobby.Round.RoundsCount
}
