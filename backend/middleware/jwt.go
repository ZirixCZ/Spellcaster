package middleware

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"net/http"
	"os"
)

func VerifyJWT(endpointHandler func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Header["Authorization"])
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
		fmt.Printf("authorized request made by %s\n", claims["username"])

		endpointHandler(w, r)
	})
}
