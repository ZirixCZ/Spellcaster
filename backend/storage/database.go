package storage

import (
	"backend/spellit/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

func connectToDB() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	dsn := os.Getenv("DB_CONNECTION_STRING")
	db, dbError := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if dbError != nil {
		log.Panic("Error connecting to db")
	}

	DB = db
	return db
}

func performMigration(db *gorm.DB) {
	db.AutoMigrate(
		&models.User{},
	)
}

func InitializeDB() *gorm.DB {
	db := connectToDB()
	performMigration(db)
	return db
}
