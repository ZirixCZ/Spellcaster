package main

import (
	"backend/spellit/middleware"
	"backend/spellit/routes"
	"backend/spellit/routes/ws"
	"backend/spellit/storage"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()

	hub := ws.NewHub()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/user/register", middleware.Preflight(routes.Register))
	mux.HandleFunc("/api/user/login", middleware.Preflight(routes.Login))
	mux.HandleFunc("/api/user/verifyusername", middleware.Preflight(middleware.VerifyJWT(routes.VerifyUsername, "user")))
	mux.HandleFunc("/api/home", middleware.Preflight(middleware.VerifyJWT(routes.Home, "user")))
	mux.HandleFunc("/api/admin", middleware.Preflight(middleware.VerifyJWT(routes.Home, "admin")))
	mux.HandleFunc("/api/lobby", middleware.Preflight(middleware.VerifyJWT(routes.LobbyHandler, "user")))
	mux.HandleFunc("/api/lobby/summary", middleware.Preflight(middleware.VerifyJWT(routes.LobbySummary, "user")))
	mux.HandleFunc("/ws/lobby/state", middleware.Preflight(hub.LobbyConnection))
	http.ListenAndServe(":8000", mux)
}
