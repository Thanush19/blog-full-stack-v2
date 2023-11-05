const express = require("express");
const router = express.Router();
const {
  writePost,
  getPost,
  getAllPosts, // Fix the controller import
  deletePost,
  editPost,
} = require("../controller/post");

// Create a new post
router.post("/write-post", writePost);

// Get all posts
router.get("/", getAllPosts); // Corrected the route path

// Get a specific post by post_id
router.get("/:post_id", getPost);

// Delete a post by post_id
router.delete("/delete/:post_id", deletePost); // Corrected the route path

// Edit a post by post_id
router.put("/edit/:post_id", editPost); // Corrected the route path

module.exports = router;
