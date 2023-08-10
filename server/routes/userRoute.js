const express = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController.js");
const { verifyUser, adminOnly } = require("../middleware/authUser.js");

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUser);
router.get("/users/:id", getUserById);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
