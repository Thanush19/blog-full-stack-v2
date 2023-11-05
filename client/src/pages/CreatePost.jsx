import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import {
//   fetchPhotos,
//   openUploadWidget,
// } from "../../services/CloudinaryService";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleSubmit = async () => {
    // Prepare the data to be posted to Cloudinary
    const formData = new FormData();
    formData.append("file", imageURLs[0]); // Assuming you're posting the first image only
    formData.append("upload_preset", "blog-thanush"); // Replace with your upload preset

    try {
      // Post the image to Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddxqeeype/image/upload",
        formData
      );

      // You can now access the uploaded image URL from the response
      const uploadedImageURL = response.data.secure_url;

      // Now, you can submit other data, including title, description, content, tags, and the uploaded image URL to your server.
      const postData = {
        title,
        description,
        content,
        tags,
        imageURLs: [uploadedImageURL], // Update with the uploaded image URL
      };

      // Send `postData` to your server for further processing.
      console.log("Data to be sent to the server:", postData);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
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
        console.log(res);
      }
    );
  }, []);
  return (
    <div className="CreatePost">
      <h3>Create a New Post</h3>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={tags.join(",")}
        onChange={handleTagChange}
      />

      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />

      {/* <button onClick={() => beginUpload("image")}>Upload Image</button> */}
      {/* <section>
        {imageURLs.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </section> */}
      <button onClick={() => widgetRef.current.open()}>upload</button>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
