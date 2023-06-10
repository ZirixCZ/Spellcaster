package types

type Round struct {
	RoundsCount          int      `json:"roundsCount"`
	RoundsPlayed         int      `json:"roundsPlayed"`
	PastWordMasters      []string `json:"pastWordMasters"`
	CurrentWordMaster    string   `json:"currentWordMaster"`
	CurrentRoundSpellers []string `json:"currentRoundSpellers"`
	Words                []string `json:"words"`
}
