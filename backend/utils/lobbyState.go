package utils

import "backend/spellit/types"

func LobbyState(lobby *types.Lobby, state *bool) bool {
	if state == nil {
		return lobby.IsStarted
	}

	lobby.IsStarted = *state
	return lobby.IsStarted
}
