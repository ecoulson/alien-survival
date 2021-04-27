export interface MoveMessage {
    player: {
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    };
}
