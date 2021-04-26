import { Message } from "../../message";
import { Connection } from "../connection";

export type RouteHandler = (message: Message, connection: Connection) => void;
