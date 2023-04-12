package ws

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// TODO: websocket routing -> keep connection between user and lobby and only the lobby that they're connected to
// subscribe depending on target_id from client
// for each lobby create a hub, that broadcasts to clients. -> perhaps different types of hubs [notification hub, state hub..]
// pair client target_id with hub
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var clients = make(map[*websocket.Conn]bool)

func (h *Hub) LobbyConnection(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := NewClient(ws, h)
	h.addClient(client)

	log.Println("Client Connected")
	go client.readMessages()
	go client.writeMessages()
}

type JoinLobbyStruct struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Type     string `json:"type"`
}
