package ws

import "encoding/json"

type Event struct {
	Name     string          `json:"name"`
	Username string          `json:"username"`
	Type     string          `json:"type"`
	Payload  json.RawMessage `json:"payload"`
}

// EventHandler is a function signature that is used to affect messages on the socket and triggered
// depending on the type
type EventHandler func(event Event, c *Client) error

const (
	// EventSendMessage is the event name for new chat messages sent
	EventJoinLobby = "join_lobby"
)

// SendMessageEvent is the payload sent in the
// send_message event
type JoinLobbyEvent struct {
	Target string `json:"target_id"`
}
