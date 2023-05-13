package utils

import "backend/spellit/types"

func SetRoles(lobby *types.Lobby, role string) []types.User {
	updatedUsers := make([]types.User, len(lobby.User))
	for i, user := range lobby.User {
		updatedUser := user
		updatedUser.Role = role
		updatedUsers[i] = updatedUser
	}
	return updatedUsers
}
