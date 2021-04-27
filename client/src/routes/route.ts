import { App } from "../app/app";
import { RouteListener } from "./route-listener";

export abstract class Route {
    constructor(protected app: App) {}

    abstract getRoutes(): Map<string, RouteListener>;
}
