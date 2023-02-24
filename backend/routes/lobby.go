package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var lobbies []Lobbies

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

	addLobby(input.Name)

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
	fmt.Printf("%+v\n", lobbies)

	resp, err := json.Marshal(lobbies)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Write(resp)
}

func addLobby(name string) {
	lobby := Lobbies{Name: name}
	lobbies = append(lobbies, lobby)
}

type LobbyInput struct {
	Name string `json:"name" validate:"required,max=256"`
}

type Lobbies struct {
	Name string `json:"name" validate:"required,max=256"`
}
