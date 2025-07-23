const { Server } = require("socket.io");

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send-message", (msg) => {
    console.log("Received:", msg);
    // Broadcast to ALL other clients (including sender)
    io.emit("new-message", msg); // NOT socket.emit
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

};

module.exports = socketHandler;
