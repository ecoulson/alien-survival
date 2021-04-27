import { Message } from "../messages/message";

export type RouteListener = (message: Message) => void;
