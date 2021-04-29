export interface SerializedPlayer {
    id: string;
    name: string;
    connectionId: string;
    transform: {
        position: {
            x: number;
            y: number;
        };
        rotation: number;
    };
}
