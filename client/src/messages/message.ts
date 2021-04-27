import { SerializedPlayer } from "./serialized-player";

export interface Message<T = any> {
    path: string;
    data: T;
}

export interface PlayerJoinedMessage
    extends Message<{
        player: SerializedPlayer;
    }> {}

export interface WhoAMIMessage extends Message<string> {}

export interface GetPlayersMessage
    extends Message<{
        players: SerializedPlayer[];
    }> {}

export interface PlayerMovedMessage
    extends Message<{
        player: SerializedPlayer;
    }> {}
