package routes

import "net/http"

func Home(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte("Welcome to the home page"))
	if err != nil {
		return
	}
}
