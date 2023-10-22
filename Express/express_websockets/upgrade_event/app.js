// ******************************
// ********** Library ***********
// ******************************

// a secret route for the get http route inside the ws route to avoid collisons
const websocketRoute = "/secret-websocket-Route-1234";

// a map mapping the route ex: 'room/:id' to it's handler function
const globalAppWSClosure = new Map();
const express = require("express");
const app = express();
// definning the app.ws function
app.ws = (route, handler) => {
  // a get rout we build to make use of express's ability of resolving routes with parameters
  app.get(websocketRoute + route, (req, res) => {
    res.json({ route, params: req.params });
  });
  globalAppWSClosure.set(route, handler);
};

upgradeEventHandler = (req, socket, head) => {
  console.log("🍅🍅🍅🍅🍅🍅");
  // pathname
  const options = {
    host: "127.0.0.1",
    port: 8000,
    path: websocketRoute + req.url,
    method: "GET",
  };
  // making a get request to get the parameters in the route
  http.get(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      const parsedData = JSON.parse(data);
      // Access JSON data in json variable
      console.log(parsedData);
      req.params = parsedData.params;
      let route = parsedData.route;
      let handlerFn = globalAppWSClosure.get(route);

      handlerFn(req, socket, head);
    });
  });
};

// ******************************
// ******** Application *********
// ******************************

const http = require("node:http");
// const express = require("express");
// const app = express();
const ws = require("ws");
// Start the Express app and the WebSocket server.

// connection event handler
const connectionHandler = (ws, req, wss) => {
  console.log("here");
  // console.log(wss.clients)
  ws.on("message", (data) => {
    Array.from(wss.clients).forEach((client) => {
      client.send("someone sent: " + data);
    });
  });

};
const rooms = new Map(); // room id to websocket server
// using the app.ws function
app.ws("/room/:id", (req, socket, head) => {
  let id = req.params.id;

  if (rooms.has(id)) {
    const wss = rooms.get(id);
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    const wss = new ws.WebSocketServer({ noServer: true });
    rooms.set(id, wss);
    wss.on("connection", (ws, req) => connectionHandler(ws, req, wss));
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });

  }
});

let server = app.listen(8000, () => {
  console.log("Listening on port 8000");
});

server.on("upgrade", upgradeEventHandler);
