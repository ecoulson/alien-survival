import App from "./app";
import { ConnectedRoute } from "./websocket/routes/connected-route";
import { PlayerRoute } from "./websocket/routes/player-route";

const app = new App({
    websocketPort: 8080,
    routes: [ConnectedRoute, PlayerRoute]
});

app.start();
