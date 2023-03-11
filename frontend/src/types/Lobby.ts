export interface LobbyInterface {
    name: string
    playerCount: number
    maxPlayers: number
    user: {
        name: string
        lobbymaster: boolean
    }
}