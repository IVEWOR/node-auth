const express = require("express");
const app = express();
const fs = require("fs");

// getting the daa
const users = require("./MOCK_DATA.json");

// Middleware / plugin
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    const body = req.body;
    const user = users[userIndex];

    const updatedUser = { ...user, ...body };
    users[userIndex] = updatedUser;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      console.log(userIndex);
      return res.json({ status: userIndex });
    });
  })
  .delete((req, res) => {
    // delete user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: users.length });
  });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
