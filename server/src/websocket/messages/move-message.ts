export interface MoveMessage {
    player: {
        id: string;
        name: string;
        transform: {
            position: {
                x: number;
                y: number;
            };
            rotation: number;
        };
    };
}
