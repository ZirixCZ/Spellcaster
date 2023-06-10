package utils

import "backend/spellit/types"

func FindLobbyIndex(lobbyList []types.Lobby, name string) (int, bool) {
	for i, lobby := range lobbyList {
		if lobby.Name == name {
			return i, true
		}
	}
	return 0, false
}
