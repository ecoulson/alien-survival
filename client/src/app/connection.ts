import { Id } from "../common/id";
import { Message } from "../messages/message";
import { MessageListener } from "./message-listener";

type Callback = () => void;

export class Connection {
    private socket: WebSocket;
    private messageListener: MessageListener | null;
    private openListener: Callback | null;
    public static CONNECTION_ID: Id | null;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.messageListener = null;
        this.openListener = null;
        this.socket.addEventListener("close", this.handleClose.bind(this));
        this.socket.addEventListener("open", this.handleOpen.bind(this));
        this.socket.addEventListener("message", this.handleMessage.bind(this));
        this.socket.addEventListener("error", this.handleError.bind(this));
    }

    private handleOpen() {
        if (this.openListener) {
            this.openListener();
        }
    }

    private handleError() {
        console.error("errored");
    }

    private handleMessage(event: any) {
        if (this.messageListener) {
            this.messageListener(JSON.parse(event.data) as Message);
        }
    }

    private handleClose() {
        console.log("Connection closed");
    }

    send(message: Message) {
        this.socket.send(JSON.stringify(message));
    }

    onMessage(listener: MessageListener) {
        this.messageListener = listener;
    }

    onOpen(listener: Callback) {
        this.openListener = listener;
    }

    close() {
        this.socket.close();
    }
}
