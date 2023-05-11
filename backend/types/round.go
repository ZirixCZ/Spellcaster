package types

type Round struct {
	RoundsCount       int      `json:"totalRounds"`
	RoundsPlayed      int      `json:"playedRounds"`
	PastWordMasters   []string `json:"pastWordMasters"`
	CurrentWordMaster string   `json:"currentWordMaster"`
	Words             []string `json:"words"`
}
