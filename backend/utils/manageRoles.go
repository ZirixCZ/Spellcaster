package utils

import (
	"backend/spellit/types"
	"fmt"
	"math/rand"
	"time"
)

// Sets roles for all users in the lobby
// success, game over
func ManageRoles(lobby *types.Lobby) bool {
	// TODO
	// * if there are not users that had not been word master
	// * then reset the past word masters
	// * and add to the round count.
	// * Check, if it hasn't surpased the max round count
	// * if it has, then end the game
	s2 := rand.NewSource(time.Now().UnixNano())
	r2 := rand.New(s2)
	for {
		randomUser := lobby.User[r2.Intn(len(lobby.User))]

		fmt.Print("wordmasters:")
		fmt.Println(len(lobby.Round.PastWordMasters))
		fmt.Println(len(lobby.User))
		if len(lobby.Round.PastWordMasters) == len(lobby.User) {
			lobby.Round.PastWordMasters = []string{}
			fmt.Print("Resetting past word masters")
		}

		if !StringInArray(lobby.Round.PastWordMasters, randomUser.UserName) {
			index, ok := FindUserIndex(lobby, randomUser.UserName)
			if !ok {
				return false
			}

			lobby.User = SetRoles(lobby, "WordSpeller")
			lobby.User[index].Role = "WordMaster"
			lobby.Round.CurrentWordMaster = randomUser.UserName
			lobby.Round.PastWordMasters = append(lobby.Round.PastWordMasters, randomUser.UserName)
			break
		}
	}

	return true
}
