import App from "./app";
import { ConnectedRoutes } from "./routes/ConnectedRoute";
import { DisconnectedRoute } from "./routes/DisconnectedRoute";

const app = new App({
    websocketPort: 8080
});

const connectedRoute = new ConnectedRoutes(app.game, app.server);
const disconnectedRoute = new DisconnectedRoute(app.game, app.server);

app.addRoute("/connected", connectedRoute.handleConnection);
app.addRoute("/disconnected", disconnectedRoute.handleConnectionClose);

app.start();
