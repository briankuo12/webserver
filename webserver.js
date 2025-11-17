import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        console.log("Received:", msg.toString());

        // 廣播給所有 client
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(msg.toString());
            }
        });
    });
});
