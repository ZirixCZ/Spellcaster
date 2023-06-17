FROM golang:1.19.5 as build

WORKDIR /app

COPY . .

RUN go build -o api

FROM ubuntu:22.04

COPY --from=build /app/api /app/api
COPY ./storage/wordlist.txt /app/storage/wordlist.txt

RUN chmod +x /app/api

WORKDIR /app

EXPOSE 8000

ENTRYPOINT /app/api
