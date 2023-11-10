import React, { useEffect, useState } from "react";
import axios from "axios";
import backend_url from "../../utils/constants";
import { Link } from "react-router-dom";

const AllPost = () => {
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([]);

  const [category, setCategory] = useState("general"); // Set the default category

  useEffect(() => {
    // Fetch news data from the backend API with optional query parameters
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${backend_url}/posts/news-api`, {
          params: {
            category: category,
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch news:", error.message);
      }
    };

    // Fetch data from the /api/posts/ endpoint
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backend_url}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };

    fetchNews();
    fetchPosts();
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCategoryInput = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <h1>Latest News</h1>
      <div>
        <label htmlFor="category">Select Category: </label>
        <select id="category" onChange={handleCategoryChange} value={category}>
          <option value="general">General</option>
          <option value="tesla">Tesla</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>
      <div>
        <label htmlFor="manualCategory">Or type category manually: </label>
        <input
          type="text"
          id="manualCategory"
          value={category}
          onChange={handleCategoryInput}
        />
      </div>
      {/* Display posts from the /api/posts/ endpoint */}
      <div style={{ background: "#000000", color: "#ffffff", padding: "10px" }}>
        <h2>Posts from Database</h2>
        {posts.map((post) => (
          <div key={post.post_id} style={{ marginBottom: "20px" }}>
            <h3>{post.title}</h3>
            <p> By {post.username}</p>
            <img
              src={post.image}
              alt={post.title}
              style={{ maxWidth: "100%" }}
            />
            <p>{post.description}</p>
            <p>
              Published on:{" "}
              {new Date(post.timestamp).toLocaleDateString("en-GB")}
            </p>
            <Link to={`/post/${post.post_id}`}>Continue reading...</Link>

            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {/* You can display other details as needed */}
          </div>
        ))}
      </div>
      {/* Display news articles */}
      <div style={{ background: "#ffffff", padding: "10px" }}>
        <h2>News Articles</h2>
        {news.map((article, index) => (
          <div
            key={
              article.url && article.urlToImage
                ? article.url + index
                : `default-${index}`
            }
            style={{ marginBottom: "20px" }}
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              style={{ maxWidth: "100%" }}
            />
            <h2>{article.title}</h2>
            <p>{article.author}</p>
            <p>{article.description}</p>
            <p>{new Date(article.publishedAt).toLocaleDateString("en-GB")}</p>
            <p>{article.content.slice(0, 50)}...</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
