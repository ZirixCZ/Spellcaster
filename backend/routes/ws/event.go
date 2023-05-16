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
)

// SendMessageEvent is the payload sent in the
// send_message event
type JoinLobbyEvent struct {
	Username string `json:"username"`
	Target   string `json:"target_id"`
}

type JoinLobbyBroadcast struct {
	JoinLobbyEvent
	Usernames []string  `json:"usernames"`
	Sent      time.Time `json:"sent"`
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
	Role string    `json:"role"`
	Sent time.Time `json:"sent"`
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
	broadMessage.Sent = time.Now()
	usernames := []string{}
	for client := range c.hub.clients {
		usernames = append(usernames, client.username)
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

	fmt.Print("lobby.Round.RoundsCount: ", lobby.Round.RoundsCount)

	manageRolesState := utils.ManageRoles(lobby)
	if !manageRolesState {
		return fmt.Errorf("Error while assigning roles")
	}

	for client := range c.hub.clients {
		if client.lobby == c.lobby {
			index, ok := utils.FindUserIndex(lobby, client.username)
			if !ok {
				return fmt.Errorf("Error while finding user index")
			}

			var broadMessage RolesBroadcast
			broadMessage.Username = client.username
			broadMessage.Target = client.lobby
			broadMessage.Role = lobby.User[index].Role
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

	if len(lobby.Round.CurrentWordMaster) == 0 {
		lobby.Round.CurrentWordMaster = c.username

		userIndex, ok := utils.FindUserIndex(lobby, c.username)
		if ok {
			return fmt.Errorf("user not found")
		}
		lobby.User[userIndex].Score += 1
	}
	log.Println(lobby.User)

	if !utils.IsValidWord(payload.Word) && utils.IsWordMaster(lobby, c.username) {
		log.Println(lobby.Word)
		log.Println("Invalid word")

		var broadMessage ErrorEvent

		broadMessage.Message = payload.Word

		var outgoingEvent Event

		data, err := json.Marshal(broadMessage)
		if err != nil {
			return fmt.Errorf("failed to marshal broadcast message: %v", err)
		}

		outgoingEvent.Type = EventInvalidWordError
		outgoingEvent.Payload = data

		for client := range c.hub.clients {
			if client.lobby == c.lobby && utils.IsWordMaster(lobby, client.username) {
				client.egress <- outgoingEvent
			}
		}
		return fmt.Errorf("invalid word")
	}

	if utils.IsWordMaster(lobby, c.username) {
		lobby.Word = payload.Word
		lobby.Round.Words = append(lobby.Round.Words, payload.Word)
		lobby.Round.PastWordMasters = append(lobby.Round.PastWordMasters, c.username)
		lobby.Round.RoundsPlayed += 1
		log.Println("Words: ", lobby.Round.Words)
	} else {
		if lobby.Word == payload.Word {
			// TODO: add point to the user

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
			return nil
		}
	}

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
	return nil
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
