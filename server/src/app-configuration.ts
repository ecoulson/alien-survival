import { Route } from "./websocket/routes/route";

type Constructor<T> = new (...args: any[]) => T;

export interface AppConfiguration {
    websocketPort: number;
    routes: Constructor<Route>[];
}
