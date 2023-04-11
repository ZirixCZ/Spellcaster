export interface LobbyInterface {
    name: string
    playerCount: number
    maxPlayers: number
    masterUsername: string
    user: User[]
}

export interface User {
    name: string
    lobbymaster: boolean
}