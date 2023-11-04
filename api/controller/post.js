const pool = require("../db/db");

const writePost = async (req, res) => {
  try {
    const { user_id, title, image, description } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (user_id, title, image, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, title, image, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a post" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

const getPost = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      post_id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the post" });
  }
};

const deletePost = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 RETURNING *",
      [post_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the post" });
  }
};

const editPost = async (req, res) => {
  const post_id = req.params.post_id;
  const { user_id, title, image, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE posts SET user_id = $1, title = $2, image = $3, description = $4 WHERE post_id = $5 RETURNING *",
      [user_id, title, image, description, post_id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the post" });
  }
};

module.exports = {
  writePost,
  getPost,
  getAllPost,
  deletePost,
  editPost,
};
