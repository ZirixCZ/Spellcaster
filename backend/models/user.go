package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName string `json:"userName"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Roles    string `json:"roles"`
}
