package types

type User struct {
	UserName string `json:"name" validate:"required,max=256"`
	Master   bool   `json:"lobbymaster"`
}
