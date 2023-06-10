package types

type User struct {
	UserName               string `json:"name" validate:"required,max=256"`
	Score                  int    `json:"score"`
	Role                   string `json:"role"`
	CurrentRoleBroadcasted bool   `json:"currentRoleBroadcasted"`
	Placement              int    `json:"placement"`
}
