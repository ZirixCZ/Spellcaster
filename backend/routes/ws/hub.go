package ws

import (
	"errors"
	"sync"
)

var (
	ErrEventNotSupported = errors.New("this event type is not supported")
)

type Hub struct {
	clients  ClientList
	handlers map[string]EventHandler
	sync.RWMutex
}

// NewHub is used to initalize all the values inside the manager
func NewHub() *Hub {
	h := &Hub{
		clients:  make(ClientList),
		handlers: make(map[string]EventHandler),
	}
	h.setupEventHandlers()
	return h
}

// setupEventHandlers configures and adds all handlers
func (h *Hub) setupEventHandlers() {
	h.handlers[EventJoinLobby] = JoinLobbyHandler
}

// routeEvent is used to make sure the correct event goes into the correct handler
func (h *Hub) routeEvent(event Event, c *Client) error {
	// Check if Handler is present in Map
	if handler, ok := h.handlers[event.Type]; ok {
		// Execute the handler and return any err
		if err := handler(event, c); err != nil {
			return err
		}
		return nil
	} else {
		return ErrEventNotSupported
	}
}

// addClient will add clients to our clientList
func (h *Hub) addClient(client *Client) {
	// Lock so we can manipulate
	h.Lock()
	defer h.Unlock()

	// Add Client
	h.clients[client] = true
}

// removeClient will remove the client and clean up
func (h *Hub) removeClient(client *Client) {
	h.Lock()
	defer h.Unlock()

	// Check if Client exists, then delete it
	if _, ok := h.clients[client]; ok {
		// close connection
		client.connection.Close()
		// remove
		delete(h.clients, client)
	}
}
