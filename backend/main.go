package main

import (
	"backend/spellit/middleware"
	"backend/spellit/routes"
	"backend/spellit/storage"
	"github.com/joho/godotenv"
	"net/http"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/user/register", middleware.Preflight(routes.Register))
	mux.HandleFunc("/api/user/login", middleware.Preflight(routes.Login))
	mux.HandleFunc("/api/home", middleware.Preflight(middleware.VerifyJWT(routes.Home, "user")))
	mux.HandleFunc("/api/admin", middleware.Preflight(middleware.VerifyJWT(routes.Home, "admin")))

	http.ListenAndServe(":8080", mux)
}
