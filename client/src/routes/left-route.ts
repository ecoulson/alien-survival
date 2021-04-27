import { Message } from "../messages/message";
import { Route } from "./route";
import { RouteListener } from "./route-listener";

export class LeftRoute extends Route {
    handleLeave(message: Message) {
        this.app.toastManager.toast(message.data.message, {
            duration: 10000
        });
    }

    getRoutes(): Map<string, RouteListener> {
        return new Map<string, RouteListener>([
            ["/left", this.handleLeave.bind(this)]
        ]);
    }
}
