package main

import (
	"backend/spellit/routes"
	"backend/spellit/storage"
	"github.com/joho/godotenv"
	"net/http"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/user/register", routes.Register)
	mux.HandleFunc("/api/user/login", routes.Login)
	mux.HandleFunc("/api/home", routes.VerifyJWT(routes.Home))

	http.ListenAndServe(":8080", mux)
}
