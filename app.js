const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`user profile id: ${userId}`);
});

app.post("/submit", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    res.send(`form submitted successfully, name: ${name}, email: ${email}`);
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});