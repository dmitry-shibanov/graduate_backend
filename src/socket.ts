import socketIO from "socket.io";
import { Server } from "http";
import initServer from "./init_socket";
let io: SocketIO.Server;

const initServer = (httpServer: Server) => {
  io = socketIO(httpServer);
  return io;
};

const initServerObj: initServer = {
  init: initServer,
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }

    return io;
  },
};

export default initServerObj;