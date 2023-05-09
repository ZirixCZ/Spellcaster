package types

type Lobby struct {
	Name           string `json:"name" validate:"required,max=256"`
	User           []User `json:"user"`
	Word           string `json:"word"`
	MasterUserName string `json:"masterUsername"`
	IsStarted      bool   `json:"isStarted"`
}
