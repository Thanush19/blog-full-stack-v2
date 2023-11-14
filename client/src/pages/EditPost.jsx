import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useParams and useNavigate
import backend_url from "../../utils/constants";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faAt } from "@fortawesome/free-solid-svg-icons";
// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
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
        const response = await axios.get(`${backend_url}/api/posts/${postId}`);
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
      await axios.put(`${backend_url}/api/posts/edit/${postId}`, post);
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
      await axios.delete(`${backend_url}/api/posts/delete/${postId}`);
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
    <div className="CreatePost h-[450vh] bg-p flex flex-col items-center ">
      <h1 className="uppercase text-3xl md:text-4xl text-center font-bold">
        Edit Post
      </h1>
      {notification && (
        <p className="text-black bg-green-500 p-3 rounded-2xl">
          {notification}
        </p>
      )}

      <div className="w-[70vw] p-3 h-[130vh] rounded-xl">
        <button
          className="bg-white text-black px-4 py-2 rounded-2xl hover:text-white hover:bg-black mb-4"
          onClick={goBack}
        >
          Back
        </button>

        <div className="mb-4 ">
          <label htmlFor="title" className="mr-2 uppercase font-semibold">
            {" "}
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="border border-black rounded px-2 py-1  uppercase font-semibold"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="mr-2 uppercase font-semibold">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={post.description}
            onChange={handleInputChange}
            className="border border-black rounded px-2 py-1 w-[70%]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mr-2 uppercase font-semibold">
            Content:
          </label>
          <textarea
            name="content"
            value={stripHtmlTags(post.content)}
            onChange={handleInputChange}
            className="mb-4 border border-black bg-white h-[30vh] w-[80vw] rounded-xl  uppercase font-semibold"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mr-2 uppercase font-semibold">Tag:</label>
          <input
            type="text"
            name="tag"
            value={post.tag}
            onChange={handleInputChange}
            className="mr-2 border border-black rounded-xl  font-semibold"
            required
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleUpdate}
            className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base"
          >
            Update
          </button>
          <br />
          <button
            onClick={handleDelete}
            className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base mt-5"
          >
            Delete
          </button>
        </div>

        {showPreview && (
          <div className="mb-4">
            <h2 className="uppercase text-3xl md:text-4xl text-center font-bold">
              Preview
            </h2>
            <h2 className="uppercase text-3xl md:text-4xl font-bold text-center">
              {post.title}
            </h2>
            <p className="italic text-center">
              <span className="mr-2">
                <FontAwesomeIcon icon={faAt} />
              </span>
              {post.username}
            </p>
            <p className="mt-10 my-1 text-center italic font-bold text-2xl md:text-3xl">
              {post.description}
            </p>
            <p className="italic text-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              {moment(post.timestamp).fromNow()}
            </p>

            <div className="flex items-center justify-center mt-5">
              <img
                src={post.image}
                alt={post.title}
                className="border border-black p-10 w-[50vw] md:w-[30vw]"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="my-6 italic text-md md:text-xl"
            ></div>
          </div>
        )}
        <div className=" flex flex-row justify-between">
          <div className="">
            {!showPreview && post.user_id && (
              <Link
                to={`/post/${postId}`}
                className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base mt-5"
              >
                Back to Post
              </Link>
            )}
            <br />
          </div>
          <div className="">
            {post.user_id && (
              <Link
                to={`/my-blogs/${post.user_id}`}
                className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base mt-5"
              >
                Back to My Blogs
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
