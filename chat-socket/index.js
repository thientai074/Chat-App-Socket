const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);

const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);

    console.log(`User with ID: ${socket.id} joined room: ${conversationId}`);
  });

  socket.on("send_message", async (data) => {
    const arr = Array.from(io.sockets.adapter.sids);

    // console.log("arr", arr[0][0]);
    io.to(data.conversationId).emit("receive_message", data);

    // console.log("socket", socket.adapter.sids);
    console.log("messageData", data);
  });

  socket.on("send_unread", (data) => {
    console.log("unreadData", data);
    io.to(data.conversationId).emit("receiver_unread", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = 8900;

app.use("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
