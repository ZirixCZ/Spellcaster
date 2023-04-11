package utils

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"net/http"
	"os"
)

func ParseJWT(r *http.Request, requestedClaim string) (string, error) {
	token, err := jwt.Parse(r.Header["Authorization"][0], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		return "", err
	}

	if err != nil || token == nil {
		fmt.Println("Could not parse token")
		return "", err
	}

	claims := token.Claims.(jwt.MapClaims)
	return claims[requestedClaim].(string), nil
}
