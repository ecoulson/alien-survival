import { Route } from "../routes/route";
import { ConstructorType } from "../common/util/constructor-type";

export interface AppConfiguration {
    canvasElement: HTMLCanvasElement;
    toastElement: HTMLDivElement;
    connectionURL: string;
    routes: ConstructorType<Route>[];
}
