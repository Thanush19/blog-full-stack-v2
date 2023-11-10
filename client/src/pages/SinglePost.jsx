// SinglePost.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import backend_url from "../../utils/constants";
import { useParams } from "react-router-dom"; // Import useParams

const SinglePost = () => {
  const { postId } = useParams(); // Use useParams to get parameters from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backend_url}/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post:", error.message);
      }
    };

    fetchPost();
  }, [postId]); // Make sure to include postId in the dependency array

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: "#000000", color: "#ffffff", padding: "10px" }}>
      <h2>{post.title}</h2>
      <p>By {post.username}</p>
      <img src={post.image} alt={post.title} style={{ maxWidth: "100%" }} />
      <p>{post.description}</p>
      <p>
        Published on: {new Date(post.timestamp).toLocaleDateString("en-GB")}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      {/* Continue reading... */}
    </div>
  );
};

export default SinglePost;
