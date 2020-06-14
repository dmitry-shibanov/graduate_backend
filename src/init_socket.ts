import { Server } from "http";

type initServerType = {
  init: (httpServer: Server) => SocketIO.Server;
  getIO: () => SocketIO.Server;
};

export default initServerType;