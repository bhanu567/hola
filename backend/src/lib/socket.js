import { Server } from "socket.io";
import http from "http";
import express from "express";
import GroupMessage from "../models/group.model.js";

const app = express();
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: [process.env.CLIENT_URL],
//   },
// });

const io = new Server(server);

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("Typing...", (data) => {
    io.emit("Typing...", data);
  });

  socket.on("joinRoom", ({ room, user }) => {
    socket.join(room.id);
    io.to(room.id).emit("newMemberJoin", {
      text: `User ${user} joined room ${room.name}`,
    });
  });

  socket.on("sendGroupMessage", async ({ roomId, message }) => {
    const updatedGroupMesssage = await GroupMessage.findOneAndUpdate(
      { _id: roomId },
      {
        $push: {
          groupMessages: message,
        },
      },
      { new: true }
    );
    const response = await updatedGroupMesssage.populate({
      path: "groupMessages.senderId",
      select: "-password -__v -updatedAt", // Exclude password, __v and updatedAt
    });

    if (response) {
      io.to(roomId).emit("receiveGroupMessage", { response });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
