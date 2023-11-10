import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@clerk/clerk-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backend_url from "../../utils/constants";
export default function CreatePost() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [formState, setFormState] = useState({
    user_id: userId, // Set the user_id here
    title: "",
    description: "",
    content: "",
    tag: "",
    image: "",
  });

  const handleContentChange = (value) => {
    setFormState({ ...formState, content: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "ddxqeeype",
        uploadPreset: "dd8cfcr1",
      },
      function (err, res) {
        if (!err && res && res.event === "success") {
          // Handle the successful upload and store the secure URL
          const secureImageUrl = res.info.secure_url;
          setFormState({ ...formState, imageURL: secureImageUrl });
        }
      }
    );
  }, [formState]);

  const handleSubmit = async () => {
    // Prepare your data for submission, including the imageURL
    const postData = {
      user_id: formState.user_id,
      title: formState.title,
      description: formState.description,
      content: formState.content,
      tag: formState.tags.split(",").map((tag) => tag.trim()),
      image: formState.imageURL,
    };

    try {
      // Send `postData` to your backend for further processing
      const response = await axios.post(
        `${backend_url}/posts/write-post`,
        postData
      );

      // Handle the response from your server as needed
      console.log("Post created:", response.data);

      // Show a success notification
      toast.success("Post submitted successfully!");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request made but no response.");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
      // Show an error notification
      toast.error("Failed to submit the post.");
    }
  };

  return (
    <div className="CreatePost">
      <h3>Create a New Post</h3>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formState.title}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formState.description}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formState.tags}
        onChange={handleInputChange}
      />

      <ReactQuill
        theme="snow"
        value={formState.content}
        onChange={handleContentChange}
      />

      <button onClick={() => widgetRef.current.open()}>Upload Image</button>

      {formState.imageURL && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={formState.imageURL} alt="Uploaded" />
        </div>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
