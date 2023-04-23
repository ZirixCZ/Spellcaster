package ws

import (
	"backend/spellit/routes"
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
	EventJoinLobby  = "join_lobby"
	EventLeaveLobby = "leave_lobby"
	EventStartLobby = "start_lobby"
	EventError      = "error"
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
	Username string `json:"username"`
	Target   string `json:"target_id"`
}

type StartLobbyBroadcat struct {
	StartLobbyEvent
	Sent time.Time `json:"sent"`
}

type ErrorEvent struct {
	Message string `json:"message"`
}

func JoinLobbyHandler(event Event, c *Client) error {
	var payload JoinLobbyEvent
	if err := json.Unmarshal(event.Payload, &payload); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}

	var lobbyList = routes.ReturnLobbyList()
	var lobbyIndex = routes.FindLobbyIndex(*lobbyList, payload.Target)
	if lobbyIndex == -1 {
		return fmt.Errorf("lobby not found")
	}

	handleTarget(event, c)
	handleUsername(event, c)

	if (*lobbyList)[lobbyIndex].IsStarted {
		var broadMessage ErrorEvent
		broadMessage.Message = "Lobby already started"
		data, err := json.Marshal(broadMessage)
		if err != nil {
			return fmt.Errorf("failed to marshal broadcast message: %v", err)
		}

		var outgoingEvent Event
		outgoingEvent.Type = EventError
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

	var lobbyList = routes.ReturnLobbyList()
	var lobbyIndex = routes.FindLobbyIndex(*lobbyList, payload.Target)
	var lobbyMaster = (*lobbyList)[lobbyIndex].MasterUserName
	if lobbyMaster != payload.Username {
		return fmt.Errorf("user not lobby master")
	}

	(*lobbyList)[lobbyIndex].IsStarted = true

	var broadMessage StartLobbyBroadcat
	broadMessage.Username = payload.Username
	broadMessage.Target = payload.Target
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
