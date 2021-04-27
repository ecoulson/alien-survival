export interface SerializedPlayer {
    id: string;
    name: string;
    connectionId: string;
    position: {
        x: number;
        y: number;
    };
}
