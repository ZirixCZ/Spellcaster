# SpellCaster Backend

Built the docker image:

```
docker-compose up --force-recreate --build
```

Set ENV

```
JWT_KEY=xxxx
DB_CONNECTION_STRING="host=xxxx user=xxxx password=xxxx dbname=xxxx port=xxxx sslmode=xxx"
```

example:

`$ JWT_KEY=xxxx DB_CONNECTION_STRING="host=xxxx user=xxxx password=xxxx dbname=xxxx port=xxxx sslmode=xxx" go run main.go`
