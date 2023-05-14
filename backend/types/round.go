package types

type Round struct {
	RoundsCount       int      `json:"roundsCount"`
	RoundsPlayed      int      `json:"roundsPlayed"`
	PastWordMasters   []string `json:"pastWordMasters"`
	CurrentWordMaster string   `json:"currentWordMaster"`
	Words             []string `json:"words"`
}
