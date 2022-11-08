package routes

import (
	"backend/spellit/models"
	"backend/spellit/storage"
	"encoding/json"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strings"
)

func Register(w http.ResponseWriter, r *http.Request) {
	var userInput RegisterUserInput

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var newUser models.User
	userExists, useExistsErr := getAndHandleUserExists(&newUser, userInput.UserName)
	if useExistsErr != nil {
		fmt.Println(useExistsErr)
		return
	}

	if userExists == true {
		fmt.Println("User exists")
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(userInput.Password)
	if hashErr != nil {
		fmt.Println(hashErr)
	}

	newUser = models.User{
		UserName: userInput.UserName,
		Password: hashedPassword,
	}

	storage.DB.Create(&newUser)

	fmt.Fprintf(w, "User: %+v", userInput)
}

func hashAndSaltPassword(password string) (hashedPassword string, err error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != err {
		return "", err
	}

	return string(hash), nil
}

func getAndHandleUserExists(user *models.User, userName string) (exists bool, err error) {
	userExistsQuery := storage.DB.Where("user_name = ?", strings.ToLower(userName)).Limit(1).Find(&user)
	if userExistsQuery.Error != nil {
		return false, userExistsQuery.Error
	}

	userExists := userExistsQuery.RowsAffected > 0

	if userExists == true {
		return true, nil
	}

	return false, nil
}

type RegisterUserInput struct {
	UserName string `json:"userName" validate:"required,max=256"`
	Password string `json:"password" validate:"required,min=8,max=256"`
}
