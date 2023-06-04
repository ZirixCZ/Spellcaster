package utils

import (
	"backend/spellit/types"
)

func InvalidateRoleBroadcast(lobby *types.Lobby) {
	for i := range lobby.User {
		lobby.User[i].CurrentRoleBroadcasted = false
	}
}
