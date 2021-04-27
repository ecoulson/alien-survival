import { App } from "./app/app";
import { JoinRoute } from "./routes/join-route";
import { LeftRoute } from "./routes/left-route";
import { PlayerRoute } from "./routes/player-route";

const inputNode = document.getElementsByName("username")[0] as HTMLInputElement;
const submit = document.getElementById("submit")!;
const join = document.getElementById("join")!;
const game = document.getElementById("game")!;
const toastElement = document.getElementById("toast")! as HTMLDivElement;
const canvasElement: HTMLCanvasElement = document.getElementById(
    "canvas"
)! as HTMLCanvasElement;

const app = new App({
    canvasElement,
    toastElement,
    connectionURL: "ws://localhost:8080",
    routes: [JoinRoute, LeftRoute, PlayerRoute]
});

app.listen();

submit.addEventListener("click", () => {
    app.connection.send({
        path: "/connected",
        data: {
            username: inputNode.value
        }
    });
    join.style.display = "none";
    game.style.display = "block";
});
