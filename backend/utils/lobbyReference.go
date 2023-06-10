package utils

import "backend/spellit/types"

func LobbyReference(lobbyList *[]types.Lobby, target string) *types.Lobby {
	var index, ok = FindLobbyIndex(*lobbyList, target)
	if !ok {
		return &types.Lobby{}
	}

	return &(*lobbyList)[index]
}
