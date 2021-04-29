import { Id } from "../../common/id";
import { Transform } from "../game-objects/transform";

export interface PlayerProps {
    name: string;
    connectionId: Id;
    transform: Transform;
}
