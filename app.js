const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

// local db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/node-auth")
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db err", err));

// schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// Middleware / plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()} | ${req.ip} | ${req.method} | ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `
    <ul>
    ${allUsers
      .map((user) => `<li>${user.firstName} | ${user.email}</li>`)
      .join("")}
    </ul>`;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req.." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success" });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
