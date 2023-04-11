package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt"
)

func VerifyJWT(endpointHandler func(w http.ResponseWriter, r *http.Request), requiredRole string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if len(r.Header["Authorization"]) < 1 {
			fmt.Println("No token provided")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		token, err := jwt.Parse(r.Header["Authorization"][0], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			return []byte(os.Getenv("JWT_KEY")), nil
		})
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		roles := claims["roles"]

		if strings.Contains(roles.(string), requiredRole) {
			endpointHandler(w, r)
			return
		}
		fmt.Printf("unauthorized request made\n")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	})
}
