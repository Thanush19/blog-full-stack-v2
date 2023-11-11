const db = require("../db/db");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const { NEWS_API_KEY } = process.env;

const writePost = async (req, res) => {
  try {
    const { username, user_id, title, image, description, content, tag } =
      req.body;
    const result = await db.query(
      "INSERT INTO posts (username, user_id, title, image, description, content, tag) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [username, user_id, title, image, description, content, tag]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a post" });
  }
};

const getAllPostsFromDb = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};
const getNewsByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query;

    // Construct the API request URL based on the provided keyword
    const apiUrl = "https://newsapi.org/v2/everything";
    const apiKey = process.env.NEWS_API_KEY;

    const apiParams = {
      apiKey,
      q: keyword,
    };

    // Fetch news from the external API based on the keyword
    const apiResult = await axios.get(apiUrl, { params: apiParams });

    // Respond with the news from the external API
    res.status(200).json({ apiNews: apiResult.data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve news" });
  }
};

const getFormattedDate = (date) => {
  // Assuming the incoming date is in the format DD-MM-YYYY
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};
const getPostDetails = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await db.query(
      "SELECT COUNT(*) AS post_count, ARRAY(SELECT DISTINCT tag FROM posts WHERE user_id = $1) AS tags, ARRAY_AGG(timestamp) AS timestamps FROM posts WHERE user_id = $1",
      [user_id]
    );

    if (result.rows.length > 0) {
      const { post_count, tags, timestamps } = result.rows[0];
      res.status(200).json({ post_count, tags, timestamps });
    } else {
      res.status(200).json({ post_count: 0, tags: [], timestamps: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve post details" });
  }
};

const getAllNewsFromApi = async (req, res) => {
  try {
    // Default values for parameters
    const defaultParams = {
      q: "general",
      from: "2023-10-10",
      sortBy: "publishedAt",
    };

    // Merge default values with provided query parameters
    const { q, from, sortBy } = { ...defaultParams, ...req.query };

    // Construct the URL for fetching news from the external API
    const apiUrl = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;

    // Make a request to the external API
    const apiResponse = await axios.get(apiUrl);

    // Extract relevant information from the API response if needed
    const allNews = apiResponse.data;

    // Respond with the fetched news
    res.status(200).json(allNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve news" });
  }
};

const getPost = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const result = await db.query("SELECT * FROM posts WHERE post_id = $1", [
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
    const result = await db.query(
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
  const { user_id, title, image, description, content, tag } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET user_id = $1, title = $2, image = $3, description = $4, content = $5, tag = $6 WHERE post_id = $7 RETURNING *",
      [user_id, title, image, description, content, tag, post_id]
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
  getAllPostsFromDb,
  getPostDetails,
  getNewsByKeyword,
  getAllNewsFromApi,
  // getNewsByDate,
  getPost,
  deletePost,
  editPost,
};
