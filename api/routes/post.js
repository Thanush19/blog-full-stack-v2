const express = require("express");
const router = express.Router();
const {
  writePost,
  getPost,
  getAllPostsFromDb,
  getPostDetails,
  getAllNewsFromApi,
  deletePost,
  editPost,
  getNewsByKeyword,
} = require("../controller/post");

// Create a new post
router.post("/write-post", writePost);

// Get all posts
//http://localhost:3000/api/posts/

router.get("/", getAllPostsFromDb);

//get all news from api

//localhost:3000/api/posts/news-api
http: router.get("/news-api", getAllNewsFromApi);

//by suing a keyword to search from api
//http://localhost:3000/api/posts/search/keyword
router.get("/search/keyword", getNewsByKeyword);

//get news by date
//router.get("/search/date", getNewsByDate);

// Get a specific post by post_id
router.get("/:post_id", getPost);
router.get("/search/keyword", getNewsByKeyword);

// Delete a post by post_id
router.delete("/delete/:post_id", deletePost); // Corrected the route path

// Edit a post by post_id
router.put("/edit/:post_id", editPost); // Corrected the route path

router.get("/details/:user_id", getPostDetails);

module.exports = router;
