package ws

import (
	"encoding/json"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var (
	pongWait     = 10 * time.Second
	pingInterval = (pongWait * 9) / 10
)

type ClientList map[*Client]bool

type Client struct {
	connection *websocket.Conn
	hub        *Hub
	egress     chan Event
	lobby      string
	username   string
}

func NewClient(conn *websocket.Conn, hub *Hub) *Client {
	return &Client{
		connection: conn,
		hub:        hub,
		egress:     make(chan Event),
	}
}

func (c *Client) readMessages() {
	defer func() {
		c.hub.removeClient(c)
	}()
	c.connection.SetReadLimit(1024)
	if err := c.connection.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
		log.Println(err)
		return
	}

	c.connection.SetPongHandler(c.pongHandler)

	for {
		_, payload, err := c.connection.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error reading message: %v", err)
			}
			break
		}
		log.Println("Payload: ", string(payload))
		var request Event
		if err := json.Unmarshal(payload, &request); err != nil {
			log.Println("Error unmarshalling payload: ", err)
			break
		}

		if err := c.hub.routeEvent(request, c); err != nil {
			log.Println("Error routing event: ", err)
		}
	}
}

func (c *Client) writeMessages() {
	ticker := time.NewTicker(pingInterval)
	defer func() {
		ticker.Stop()
		c.hub.removeClient(c)
	}()

	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection closed: ", err)
				}
				return
			}
			data, err := json.Marshal(message)
			if err != nil {
				log.Println("Error marshalling message: ", err)
				return
			}

			if err := c.connection.WriteMessage(websocket.TextMessage, data); err != nil {
				log.Println("Error writing message: ", err)
				return
			}
			log.Println("Message sent to client")
		case <-ticker.C:
			if err := c.connection.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				log.Println("writemsg: ", err)
				return
			}
		}
	}
}

func (c *Client) pongHandler(pongMsg string) error {
	return c.connection.SetReadDeadline(time.Now().Add(pongWait))
}
