import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import backend_url from "../../utils/constants";

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const EditPost = () => {
  const { postId } = useParams();

  const [post, setPost] = useState({
    user_id: "",
    title: "",
    description: "",
    content: "",
    tag: "",
    image: "", // Include image in the post state
  });

  // State for notifications
  const [notification, setNotification] = useState(null);

  // State for preview
  const [showPreview, setShowPreview] = useState(false);

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
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${backend_url}/posts/edit/${postId}`, post);
      // Show update notification
      setNotification("Post updated successfully!");
      // Show preview
      setShowPreview(true);
    } catch (error) {
      console.error("Failed to update post:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${backend_url}/posts/delete/${postId}`);
      // Show delete notification
      setNotification("Post deleted successfully!");
      // Clear post data
      setPost({
        user_id: "",
        title: "",
        description: "",
        content: "",
        tag: "",
        image: "",
      });
      // Hide preview
      setShowPreview(false);
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };
  return (
    <div>
      <h1>Edit Post</h1>
      {/* Show notification if available */}
      {notification && <p>{notification}</p>}
      {/* Show preview if available */}

      <br />
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={post.description}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>Content:</label>
      <textarea
        name="content"
        value={stripHtmlTags(post.content)}
        onChange={handleInputChange}
        required
      />
      <br />
      <label>Tag:</label>
      <input
        type="text"
        name="tag"
        value={post.tag}
        onChange={handleInputChange}
        required
      />

      <br />

      <br />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      {showPreview && (
        <div>
          <h2>Preview</h2>
          <h3>{post.title}</h3>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              style={{ maxWidth: "10%" }}
            />
          )}
          <p>{post.description}</p>
          <p>{stripHtmlTags(post.content)}</p>
        </div>
      )}
      {!showPreview && post.user_id && (
        <Link to={`/post/${postId}`}>Back to Post</Link>
      )}
      {post.user_id && (
        <Link to={`/my-blogs/${post.user_id}`}>Back to My Blogs</Link>
      )}
    </div>
  );
};

export default EditPost;
