package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName string `json:"userName""`
	Password string `json:"password""`
}
