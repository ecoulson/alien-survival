import { Message } from "../messages/message";

export type MessageListener = (event: Message) => void;
