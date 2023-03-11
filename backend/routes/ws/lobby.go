package ws

import (
	"backend/spellit/routes"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func JoinLobby(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	// upgrade this connection to a WebSocket
	// connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Client Connected")
	err = ws.WriteMessage(1, []byte("Hello client you've connected!"))
	if err != nil {
		log.Println(err)
	}

	str, err := reader(ws)
	if err != nil {
		log.Println(err)
	}

	// Unmarshal the JSON object into the struct
	var data JoinLobbyStruct
	err = json.Unmarshal([]byte(str), &data)
	if err != nil {
		panic(err)
	}

	lobbyList := routes.ReturnLobbyList()

	// Modify the contents of the LobbyList variable
	index := findLobbyIndex(*lobbyList, data.Name)
	if index < 0 {
		fmt.Println("Could not find lobby")
		return
	}

	//	indexUser := findUserIndex((*lobbyList)[index].User, data.Username)
	(*lobbyList)[index].PlayerCount++
	newUser := routes.User{UserName: data.Username, Master: false}
	(*lobbyList)[index].User = append((*lobbyList)[index].User, newUser)
}

func reader(conn *websocket.Conn) (string, error) {
	// read in a message
	messageType, p, err := conn.ReadMessage()
	if err != nil {
		return "", err
	}

	// convert the message payload to a string
	message := string(p)

	// print out incoming message
	fmt.Println("incoming message: " + message)

	// send the message back over the websocket
	if err := conn.WriteMessage(messageType, p); err != nil {
		return "", err
	}

	// return the message as a string
	return message, nil
}

func findLobbyIndex(lobbyList []routes.Lobbies, name string) int {
	for i, lobby := range lobbyList {
		if lobby.Name == name {
			return i
		}
	}
	return -1
}

func findUserIndex(userList []routes.User, username string) int {
	for i, user := range userList {
		if user.UserName == username {
			return i
		}
	}
	return -1
}

type JoinLobbyStruct struct {
	Name     string `json:"name"`
	Username string `json:"username"`
}
