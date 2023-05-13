package utils

import "backend/spellit/types"

// Sets the lobby state to the given state
// returns the current state
func LobbyState(lobby *types.Lobby, state *bool) bool {
	if state == nil {
		return lobby.IsStarted
	}

	lobby.IsStarted = *state
	return lobby.IsStarted
}
