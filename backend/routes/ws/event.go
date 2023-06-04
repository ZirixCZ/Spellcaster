package ws

import (
	"backend/spellit/routes"
	"backend/spellit/types"
	"backend/spellit/utils"
	"encoding/json"
	"fmt"
	"log"
	"time"
)

type Event struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

// EventHandler is a function signature that is used to affect messages on the socket and triggered
// depending on the type
type EventHandler func(event Event, c *Client) error

const (
	EventJoinLobby         = "join_lobby"
	EventLeaveLobby        = "leave_lobby"
	EventStartLobby        = "start_lobby"
	EventInvalidLobbyError = "lobby_error"
	EventInvalidWordError  = "word_error"
	EventFetchUsers        = "fetch_users"
	EventInputWord         = "input_word"
	EventSuccess           = "success"
	EventRoles             = "roles"
	EventEndGame           = "end_game"
)

// SendMessageEvent is the payload sent in the
// send_message event
type JoinLobbyEvent struct {
	Username string `json:"username"`
	Target   string `json:"target_id"`
}

type JoinLobbyBroadcast struct {
	JoinLobbyEvent
	Usernames      []string  `json:"usernames"`
	MasterUserName string    `json:"master_username"`
	Sent           time.Time `json:"sent"`
}

type StartLobbyEvent struct {
	Username    string `json:"username"`
	Target      string `json:"target_id"`
	RoundsCount int    `json:"rounds_count"`
}

type StartLobbyBroadcat struct {
	StartLobbyEvent
	Sent time.Time `json:"sent"`
}

type RolesEvent struct {
	Username string `json:"username"`
	Target   string `json:"target_id"`
}

type RolesBroadcast struct {
	RolesEvent
	Role         string    `json:"role"`
	RoundsPlayed int       `json:"rounds_played"`
	Sent         time.Time `json:"sent"`
}

type ErrorEvent struct {
	Message string `json:"message"`
}

type FetchUsersEvent struct {
	Target string `json:"target_id"`
}

type FetchUsersBroadcast struct {
	FetchUsersEvent
	Usernames []string  `json:"usernames"`
	Sent      time.Time `json:"sent"`
}

type InputWordEvent struct {
	Username string `json:"username"`
	Target   string `json:"target_id"`
	Word     string `json:"word"`
	Timedout bool   `json:"timedout"`
}

type InputWordBroadcast struct {
	InputWordEvent
	Sent time.Time `json:"sent"`
}

type Success struct {
	Message string `json:"message"`
}

type SuccessBroadcast struct {
	Success
	Sent time.Time `json:"sent"`
}

type EndGameEvent struct {
	Target string    `json:"target_id"`
	Winner string    `json:"winner"`
	Sent   time.Time `json:"sent"`
}

func JoinLobbyHandler(event Event, c *Client) error {
	var payload JoinLobbyEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var lobby = utils.LobbyReference(routes.ReturnLobbyList(), payload.Target)

	handleTarget(event, c)
	handleUsername(event, c)

	if utils.LobbyState(lobby, nil) {
		var broadMessage ErrorEvent
		broadMessage.Message = "Lobby already started"
		data, err := json.Marshal(broadMessage)
		if err != nil {
			return fmt.Errorf("failed to marshal broadcast message: %v", err)
		}

		var outgoingEvent Event
		outgoingEvent.Type = EventInvalidLobbyError
		outgoingEvent.Payload = data

		for client := range c.hub.clients {
			if client.lobby == c.lobby {
				client.egress <- outgoingEvent
			}
		}
		return fmt.Errorf("lobby already started")
	}

	log.Println("Client Lobby: ", c.lobby)
	log.Println("Target Lobby: ", payload.Target)
	var broadMessage JoinLobbyBroadcast
	broadMessage.Username = payload.Username
	broadMessage.Target = payload.Target
	broadMessage.MasterUserName = lobby.MasterUserName
	broadMessage.Sent = time.Now()
	usernames := []string{}
	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			usernames = append(usernames, client.username)
		}
	}
	broadMessage.Usernames = usernames

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Type = EventJoinLobby
	outgoingEvent.Payload = data

	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			client.egress <- outgoingEvent
		}
	}

	return nil
}

func StartLobbyHandler(event Event, c *Client) error {
	var payload StartLobbyEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	if !utils.IsString(payload.Username) || !utils.IsString(payload.Target) {
		return fmt.Errorf("There's been an error with the payload")
	}

	var lobby = utils.LobbyReference(routes.ReturnLobbyList(), payload.Target)

	var lobbyMaster = lobby.MasterUserName
	if lobbyMaster != payload.Username {
		return fmt.Errorf("user not lobby master")
	}

	lobby.Round.RoundsCount = payload.RoundsCount
	lobby.Round.RoundsPlayed = 0

	state := true
	utils.LobbyState(lobby, &state)

	var broadMessage StartLobbyBroadcat
	broadMessage.Username = payload.Username
	broadMessage.Target = payload.Target
	broadMessage.RoundsCount = payload.RoundsCount
	broadMessage.Sent = time.Now()

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Type = EventStartLobby
	outgoingEvent.Payload = data

	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			lobby.User = append(lobby.User, types.User{UserName: client.username, Score: 0})
			client.egress <- outgoingEvent
		}
	}

	return nil
}

func RolesHandler(event Event, c *Client) error {
	var payload RolesEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var lobby = utils.LobbyReference(routes.ReturnLobbyList(), payload.Target)

	isEndGame := utils.ManageGameEnd(lobby)
	if isEndGame {
		EndGameHandler(event, c, lobby)
		return nil
	}

	manageRolesState := utils.ManageRoles(lobby)
	if !manageRolesState {
		return fmt.Errorf("Error while assigning roles")
	}

	for client := range c.hub.clients {
		fmt.Println("client.lobby: ", client.lobby)
		if client.lobby == c.lobby {
			index, ok := utils.FindUserIndex(lobby, client.username)
			if !ok {
				return fmt.Errorf("Error while finding user index")
			}
			fmt.Println(client.username)

			if lobby.User[index].CurrentRoleBroadcasted {
				return nil
			}

			var broadMessage RolesBroadcast
			broadMessage.Username = client.username
			broadMessage.Target = client.lobby
			broadMessage.RoundsPlayed = lobby.Round.RoundsPlayed
			broadMessage.Role = lobby.User[index].Role
			lobby.User[index].CurrentRoleBroadcasted = true
			broadMessage.Sent = time.Now()

			fmt.Println("Role: ", broadMessage.Role)

			data, err := json.Marshal(broadMessage)
			if err != nil {
				return fmt.Errorf("failed to marshal broadcast message: %v", err)
			}

			var outgoingEvent Event
			outgoingEvent.Type = EventRoles
			outgoingEvent.Payload = data

			client.egress <- outgoingEvent
		}
	}

	return nil
}

func FetchUsersHandler(event Event, c *Client) error {
	var payload FetchUsersEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var broadMessage FetchUsersBroadcast
	broadMessage.Sent = time.Now()

	usernames := []string{}
	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			usernames = append(usernames, client.username)
		}
	}
	broadMessage.Usernames = usernames
	broadMessage.Target = payload.Target

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Type = EventFetchUsers
	outgoingEvent.Payload = data

	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			client.egress <- outgoingEvent
		}
	}
	return nil
}

func InputWordHandler(event Event, c *Client) error {
	var payload InputWordEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var lobby = utils.LobbyReference(routes.ReturnLobbyList(), payload.Target)

	userIndex, ok := utils.FindUserIndex(lobby, c.username)
	if !ok {
		return fmt.Errorf("user not found")
	}

	// WordMaster
	if utils.IsWordMaster(lobby, c.username) {
		// Wordmaster times out
		if payload.Timedout {
			utils.InvalidateRoleBroadcast(lobby)
			RolesHandler(event, c)
			lobby.Round.RoundsPlayed += 1
			return nil
		}

		if !utils.IsValidWord(payload.Word) || utils.StringInArray(lobby.Round.Words, payload.Word) {
			log.Println("WordMaster: Word is invalid. Word: ", payload.Word)

			message := ""
			if utils.StringInArray(lobby.Round.Words, payload.Word) {
				message = payload.Word + " has already been used"
			} else {
				message = payload.Word + " is not a valid word"
			}

			outgoingEvent, err := broadcastError(EventInvalidWordError, event, c, message, lobby)
			if err != nil {
				return fmt.Errorf("failed to broadcast error: %v", err)
			}

			for client := range c.hub.clients {
				if client.lobby == c.lobby && utils.IsWordMaster(lobby, client.username) {
					client.egress <- outgoingEvent
				}
			}
			return fmt.Errorf("invalid word")
		}

		fmt.Print("isLobbyMaster", lobby.Word)
		lobby.Word = payload.Word
		lobby.Round.Words = append(lobby.Round.Words, payload.Word)
		log.Println("Words: ", lobby.Round.Words)
		lobby.User[userIndex].Score += 1

		var broadMessage InputWordBroadcast
		broadMessage.Sent = time.Now()

		broadMessage.Username = payload.Username
		broadMessage.Target = payload.Target
		broadMessage.Word = payload.Word

		data, err := json.Marshal(broadMessage)
		if err != nil {
			return fmt.Errorf("failed to marshal broadcast message: %v", err)
		}

		var outgoingEvent Event
		outgoingEvent.Type = EventInputWord
		outgoingEvent.Payload = data

		for client := range c.hub.clients {
			if client.lobby == c.lobby && !utils.IsWordMaster(lobby, client.username) {
				client.egress <- outgoingEvent
			}
		}

		for client := range c.hub.clients {
			if client.lobby == c.lobby && client.username == c.username {
				client.egress <- outgoingEvent
			}
		}
		return nil
	} else {
		lobby.Round.CurrentRoundSpellers = append(lobby.Round.CurrentRoundSpellers, c.username)

		if !utils.IsValidWord(payload.Word) || !utils.StringInArray(lobby.Round.Words, payload.Word) {
			log.Println("WordSpeller: Word is invalid. Word: ", payload.Word)

			var message string
			// WordSpeller times out
			if payload.Timedout {
				message = "oh maw gawd, you timed out"
			}

			message = fmt.Sprintf("The provided word %s is not the correct word.", payload.Word)

			outgoingEvent, err := broadcastError(EventInvalidWordError, event, c, message, lobby)
			if err != nil {
				return fmt.Errorf("failed to broadcast error: %v", err)
			}

			for client := range c.hub.clients {
				if client.lobby == c.lobby && client.username == c.username {
					client.egress <- outgoingEvent
				}
			}

			if utils.CheckRoundEnd(lobby) {
				utils.InvalidateRoleBroadcast(lobby)
				RolesHandler(event, c)
			}
			return fmt.Errorf("invalid word")
		}

		if lobby.Word == payload.Word {
			lobby.User[userIndex].Score += 1

			var broadMessage SuccessBroadcast
			broadMessage.Message = "Correct!"
			broadMessage.Sent = time.Now()

			data, err := json.Marshal(broadMessage)
			if err != nil {
				return fmt.Errorf("failed to marshal broadcast message: %v", err)
			}

			var outgoingEvent Event
			outgoingEvent.Type = EventSuccess
			outgoingEvent.Payload = data

			for client := range c.hub.clients {
				if client.lobby == c.lobby && client.username == c.username {
					client.egress <- outgoingEvent
				}
			}

		}
		if utils.CheckRoundEnd(lobby) {
			utils.InvalidateRoleBroadcast(lobby)
			RolesHandler(event, c)
		}
	}

	return nil
}

func EndGameHandler(event Event, c *Client, lobby *types.Lobby) error {
	var broadMessage EndGameEvent
	broadMessage.Sent = time.Now()

	broadMessage.Target = lobby.Name
	// TODO: sort by score
	broadMessage.Winner = "test"

	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Type = EventEndGame
	outgoingEvent.Payload = data

	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			client.egress <- outgoingEvent
		}
	}
	return nil
}

func broadcastError(outgoingEventType string, event Event, c *Client, message string, lobby *types.Lobby) (Event, error) {
	var broadMessage ErrorEvent
	broadMessage.Message = message
	data, err := json.Marshal(broadMessage)
	if err != nil {
		return Event{}, fmt.Errorf("failed to marshal broadcast message: %v", err)
	}

	var outgoingEvent Event
	outgoingEvent.Type = outgoingEventType
	outgoingEvent.Payload = data

	return outgoingEvent, nil
}

func handleTarget(event Event, c *Client) error {
	var lobby JoinLobbyEvent
	if err := json.Unmarshal(event.Payload, &lobby); err != nil {
		fmt.Errorf("bad payload in request: %v", err)
	}
	c.lobby = lobby.Target

	log.Println("Lobby: ", lobby.Target)

	return nil
}

func handleUsername(event Event, c *Client) error {
	var client JoinLobbyEvent
	if err := json.Unmarshal(event.Payload, &client); err != nil {
		fmt.Errorf("bad payload in request: %v", err)
	}

	c.username = client.Username

	log.Println("Username: ", client.Username)

	return nil
}
