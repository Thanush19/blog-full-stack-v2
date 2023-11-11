import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import backend_url from "../../utils/constants";

const MyBlogs = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/posts?user_id=${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleEdit = (postId) => {
    // Implement logic to navigate to the edit page for the specific post
    // You can use react-router-dom's history or navigate function here
  };

  return (
    <div>
      <h1>My Blogs</h1>
      <ul>
        {posts.map((post) => (
          <div key={post.post_id} style={{ marginBottom: "20px" }}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{ maxWidth: "100%" }}
              />
            )}
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{new Date(post.timestamp).toLocaleDateString("en-GB")}</p>
            <p>{post.content.slice(0, 50)}...</p>
            <Link to={`/post/${post.post_id}`}>Continue reading...</Link>

            <Link to={`/edit/${post.post_id}`}>Edit</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MyBlogs;
