import App from "./app";
import { Game } from "./game/game";
import { ConnectedRoutes } from "./routes/ConnectedRoute";

const app = new App({
    websocketPort: 8080
});
const game = new Game();

const connectedRoute = new ConnectedRoutes(game);

app.addRoute("/connected", connectedRoute.handleConnection);

app.start();
