import { Equatable } from "../common/equatable";
import { Identifiable } from "../common/identifiable";
import { Message } from "../message";

export interface Connection extends Identifiable, Equatable<Connection> {
    send(message: Message): void;
}
