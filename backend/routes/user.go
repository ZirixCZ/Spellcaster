package routes

import (
	"backend/spellit/models"
	"backend/spellit/storage"
	"encoding/json"
	"fmt"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"strings"
	"time"
)

func Register(w http.ResponseWriter, r *http.Request) {
	var userInput RegisterUserInput

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var newUser models.User
	userExists, userExistsErr := getAndHandleUserExists(&newUser, userInput.Email)
	if userExistsErr != nil {
		fmt.Println(userExistsErr)
		return
	}

	if userExists == true {
		fmt.Println("User exists")
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "User exists")
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
		Roles:    userInput.Roles,
	}

	storage.DB.Create(&newUser)

	w.WriteHeader(http.StatusCreated)
	fmt.Printf("New user: %s\n", userInput.Email)
	fmt.Fprintf(w, "User %+v created", userInput.Email)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var userInput RegisterUserInput

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	var user models.User
	userExists, userExistsError := getAndHandleUserExists(&user, userInput.UserName)
	if userExistsError != nil {
		fmt.Println(userExistsError)
		return
	}

	if userExists == false {
		fmt.Printf("User %s doesn't exist\n", userInput.UserName)
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "User %s doesn't exist\n", userInput.UserName)
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
		return
	}

	jwt, err := GenerateJWT(userInput.UserName)
	if err != nil {
		fmt.Println(err)
		return
	}

	resp := make(map[string]string)
	resp["jwt"] = jwt
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
	fmt.Printf("New Login: %s\n", userInput.UserName)
}

func GenerateJWT(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().UTC().Add(30 * time.Minute).Unix()

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
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
	Roles    string `json:"roles" validate:"required,max=256"`
}
