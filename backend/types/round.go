package types

type Round struct {
	RoundsCount       int      `json:"totalRounds"`
	RoundsPlayed      int      `json:"playedRounds"`
	PastWordMasters   []User   `json:"pastWordMasters"`
	CurrentWordMaster User     `json:"currentWordMaster"`
	Words             []string `json:"words"`
}
