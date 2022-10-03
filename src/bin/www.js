import http from "http";
import app from "../app";
import db from "./db";

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `sever is listening on port : ${PORT}, Process ID: ${process.pid}`
  );
  db();
});
