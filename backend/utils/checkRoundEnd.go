package utils

import (
	"backend/spellit/types"
	"fmt"
)

func CheckRoundEnd(lobby *types.Lobby) bool {
	if len(lobby.Round.CurrentRoundSpellers) == len(lobby.User)-1 {
		fmt.Println("Round over")
		lobby.Round.CurrentRoundSpellers = []string{}
		lobby.Round.RoundsPlayed += 1
		return true
	}

	return false
}
