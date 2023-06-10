package utils

import "reflect"

func IsString(val interface{}) bool {
	return reflect.TypeOf(val).Kind() == reflect.String
}
