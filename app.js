const express = require("express");
const app = express();
const { connectMongoDb } = require("./db.connect");

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

// db connect
connectMongoDb("mongodb://127.0.0.1:27017/node-auth").then(() =>
  console.log("db connected")
);

// Middleware / plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/users", userRouter);

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
