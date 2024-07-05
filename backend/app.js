const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/error-handler-middleware");
const authMiddleware = require("./middlewares/auth-middleware");
const usersController = require("./controllers/users-controller");
const authController = require("./controllers/auth-controller");

var corsWhitelist = [
  "http://localhost:3000",
  "http://google.com",
  "http://facebook.com",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express(corsOptions);

app.use(cors(corsOptions));
app.use(express.json());

app.use(authMiddleware);
app.use("/registration", authController);
app.use("/", usersController);
app.use(errorHandler);

app.listen(8080, () => console.log("Listening on port 8080."));
