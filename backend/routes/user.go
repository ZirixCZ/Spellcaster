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
	userExists, userExistsErr := getAndHandleUserExists(&newUser, userInput.UserName)
	if userExistsErr != nil {
		fmt.Println(userExistsErr)
		return
	}

	if userExists == true {
		fmt.Println("User exists")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "user exists")
		return
	}

	hashedPassword, hashErr := hashAndSaltPassword(userInput.Password)
	if hashErr != nil {
		fmt.Println(hashErr)
	}

	newUser = models.User{
		UserName: userInput.UserName,
		Email:    userInput.Email,
		Password: hashedPassword,
	}

	storage.DB.Create(&newUser)

	fmt.Fprintf(w, "User: %+v", userInput)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var userInput RegisterUserInput

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	var user models.User
	userExists, userExistsError := getAndHandleUserExists(&user, userInput.UserName)
	if userExistsError != nil {
		fmt.Println(userExistsError)
		return
	}

	if userExists == false {
		fmt.Println("User doesn't exist")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "User doesn't exist")
		return
	}

	hashError := getHashedPassword(userInput.UserName, &user)
	if hashError != nil {
		fmt.Println("An error occurred")
		return
	}

	matchPasswords := doPasswordMatch(user.Password, userInput.Password)
	if matchPasswords == false {
		fmt.Println("Passwords do not match")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Passwords do not match")
	}

	w.WriteHeader(http.StatusOK)
	fmt.Println("user login")
	fmt.Fprintf(w, "Access for %+v has been granted", userInput.UserName)
}

func hashAndSaltPassword(password string) (hashedPassword string, err error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != err {
		return "", err
	}

	return string(hash), nil
}

func doPasswordMatch(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}

func getHashedPassword(userName string, user *models.User) error {
	getHash := storage.DB.Select("password").Where("user_name = ?", strings.ToLower(userName)).Limit(1).Find(&user)
	if getHash.Error != nil {
		return getHash.Error
	}

	return nil
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
	Email    string `json:"email" validate:"required,min=8,max=256"`
	Password string `json:"password" validate:"required,min=8,max=256"`
}
