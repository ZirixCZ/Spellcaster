FROM golang:1.19.5

WORKDIR /app

COPY . .
RUN go mod tidy
RUN go run main.go