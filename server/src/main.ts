import App from "./app";
import { ConnectedRoute } from "./websocket/routes/connected-route";

const app = new App({
    websocketPort: 8080,
    routes: [ConnectedRoute]
});

app.start();
