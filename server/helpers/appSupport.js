import {config} from "../config/config.js";
import { port, server } from "../server.js";

export const normalizePort = (value) => {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (value >= 0) {
    return port;
  }
  return false;
};

export const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    case "ECONNREFUSED":
        console.error(`Connection refused`);
        process.exit(1);
        break;
    default:
      throw error;
  }
};

export const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind}`);
};

export const handle404 = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

export const basicErrorHandler = (err, req, res, next) => {
  // Defer to built-in error handler if headersSent
  // See: http://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }
  res.locals.message = err.message;
  if (config.NODE_ENV === "development") {
    res.locals.error = err;
  } else {
    res.locals.error = "";
  }
  // render the error page
  res.status(err.status || 500);
  res.send("error");
};

