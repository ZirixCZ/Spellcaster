package routes

import (
	"backend/spellit/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

var LobbyList []Lobbies

func LobbyHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getLobbies(w, r)
	case "POST":
		createLobby(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func createLobby(w http.ResponseWriter, r *http.Request) {
	var input LobbyInput

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	lobbyMaster, err := utils.ParseJWT(r, "username")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Could not parse token"))
		return
	}

	addLobby(input.Name, lobbyMaster)

	resp := make(map[string]string)
	resp["name"] = input.Name
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
}

func getLobbies(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("%+v\n", LobbyList)

	resp, err := json.Marshal(LobbyList)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Write(resp)
}

func addLobby(name string, lobbyMaster string) {
	lobby := Lobbies{Name: name, MasterUserName: lobbyMaster}
	LobbyList = append(LobbyList, lobby)
}

func ReturnLobbyList() *[]Lobbies {
	return &LobbyList
}

func FindLobbyIndex(lobbyList []Lobbies, name string) int {
	for i, lobby := range lobbyList {
		if lobby.Name == name {
			return i
		}
	}
	return -1
}

type LobbyInput struct {
	Name string `json:"name" validate:"required,max=256"`
}

type User struct {
	UserName string `json:"name" validate:"required,max=256"`
	Master   bool   `json:"lobbymaster"`
}

type Lobbies struct {
	Name           string `json:"name" validate:"required,max=256"`
	User           []User `json:"user"`
	MasterUserName string `json:"masterUsername"`
	IsStarted      bool   `json:"isStarted"`
}
