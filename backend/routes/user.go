package routes

import (
	"backend/spellit/models"
	"backend/spellit/storage"
	"backend/spellit/utils"
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
	var userInput UserStruct

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var newUser models.User
	userExists, userExistsErr := getAndHandleUserExists(&newUser, userInput.Email, userInput.UserName)
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
	var userInput UserStruct

	err := json.NewDecoder(r.Body).Decode(&userInput)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	var user models.User
	userExists, userExistsError := handleLogin(&user, userInput.UserName)
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

	jwt, err := GenerateJWT(userInput.UserName, user.Roles)
	if err != nil {
		fmt.Println(err)
		return
	}

	resp := make(map[string]string)
	resp["jwt"] = jwt
	resp["roles"] = user.Roles
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
	fmt.Printf("New Login: %s\n", userInput.UserName)
}

func VerifyUsername(w http.ResponseWriter, r *http.Request) {
	userName, err := utils.ParseJWT(r, "username")
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Could not parse token"))
		return
	}

	resp := make(map[string]string)
	resp["userName"] = userName
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResp)
}

func GenerateJWT(username string, roles string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["username"] = username
	claims["roles"] = roles
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

func handleLogin(user *models.User, userName string) (bool, error) {
	userUserNameExists := storage.DB.Where("user_name = ?", strings.ToLower(userName)).Limit(1).Find(&user)
	if userUserNameExists.Error != nil {
		return false, userUserNameExists.Error
	}

	userExists := userUserNameExists.RowsAffected > 0

	if userExists == true {
		return true, nil
	}

	return false, nil
}

func getAndHandleUserExists(user *models.User, email string, userName string) (exists bool, err error) {
	userUserNameExists := storage.DB.Where("user_name = ?", strings.ToLower(userName)).Limit(1).Find(&user)
	userEmailExists := storage.DB.Where("email = ?", strings.ToLower(email)).Limit(1).Find(&user)
	if userUserNameExists.Error != nil {
		return false, userUserNameExists.Error
	}

	if userEmailExists.Error != nil {
		return false, userEmailExists.Error
	}

	userExists := userUserNameExists.RowsAffected > 0 || userEmailExists.RowsAffected > 0

	if userExists == true {
		return true, nil
	}

	return false, nil
}

type UserStruct struct {
	UserName string `json:"userName" validate:"required,max=256"`
	Email    string `json:"email" validate:"required,min=8,max=256"`
	Password string `json:"password" validate:"required,min=8,max=256"`
	Roles    string `json:"roles" validate:"required,max=256"`
}
