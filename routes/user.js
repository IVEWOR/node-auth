const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

// routes
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// router.get("/users", async (req, res) => {
//   const allUsers = await User.find({});
//   const html = `
//       <ul>
//       ${allUsers
//         .map((user) => `<li>${user.firstName} | ${user.email}</li>`)
//         .join("")}
//       </ul>`;
//   res.send(html);
// });

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
