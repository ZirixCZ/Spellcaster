export interface LobbyInterface {
  name: string;
  playerCount: number;
  masterUsername: string;
  user: User[];
  isStarted: boolean;
}

export interface User {
  name: string;
  score?: string;
  placement?: string;
  lobbymaster?: boolean;
}
