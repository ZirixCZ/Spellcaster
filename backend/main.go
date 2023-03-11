package main

import (
	"backend/spellit/middleware"
	"backend/spellit/routes"
	"backend/spellit/routes/ws"
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
	mux.HandleFunc("/api/user/getusername", middleware.Preflight(middleware.VerifyJWT(routes.GetUsername, "user")))
	mux.HandleFunc("/api/home", middleware.Preflight(middleware.VerifyJWT(routes.Home, "user")))
	mux.HandleFunc("/api/admin", middleware.Preflight(middleware.VerifyJWT(routes.Home, "admin")))
	mux.HandleFunc("/api/lobby", middleware.Preflight(middleware.VerifyJWT(routes.LobbyHandler, "user")))
	mux.HandleFunc("/ws/lobby", middleware.Preflight(ws.JoinLobby))
	http.ListenAndServe(":8000", mux)
}
