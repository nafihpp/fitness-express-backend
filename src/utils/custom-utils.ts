import { Server } from "socket.io";
import { AllowedCors } from "../config/cors";

export const createSocketServer = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: AllowedCors.origin,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("message", "Welcome to the KYC Notification Service");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};
