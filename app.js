const app = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("error", console.bind(console, "MongoDB connected error: "));
db.once("open", () => {
    console.log("connected to mongodb");
});

module.exports = db;
