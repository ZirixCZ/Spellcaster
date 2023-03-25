package middleware

import (
	"net/http"
)

func Preflight(endpointHandler func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Max-Age", "15")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		if r.Method == "OPTIONS" {
			w.Header().Add("Connection", "keep-alive")
			w.Header().Add("Access-Control-Request-Headers", "*")
			w.WriteHeader(http.StatusOK)
			return
		}
		endpointHandler(w, r)
	})
}
