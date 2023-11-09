import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

      <button onClick={() => widgetRef.current.open()}>upload</button>
      <button type="button">Submit</button>
    </div>
  );
}
