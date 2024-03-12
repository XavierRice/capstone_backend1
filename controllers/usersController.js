const express = require("express");
const users = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const {
  getUsers,
  getOneUser,
  createUser,
  logInUser,
  updateUser,
  deleteUser,
} = require("../queries/users");

// GET users
users.get("/", async (req, res) => {
  try {
    const usersList = await getUsers();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// get one user
users.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getOneUser(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

// POST new user
users.post("/register", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign(
      { userId: newUser.user_id, username: newUser.user_name },
      secret
    );
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: "Invalid Information", info: err.message });
  }
});

// PUT update user
users.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error updating user", info: err.message });
  }
});

users.post("/login", async (req, res) => {
  try {
    const user = await logInUser(req.body);
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.user_name },
      secret
    );

    res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

users.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.status(200).json({ message: "Successfully deleted user" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

module.exports = users;
