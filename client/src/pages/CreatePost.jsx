import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backend_url from "../../utils/constants";
export default function CreatePost() {
  const { userId } = useAuth();
  const { user } = useUser();

  const [formState, setFormState] = useState({
    username: user.firstName,
    user_id: userId,
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
  const [submitted, setSubmitted] = useState(false);

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
      username: formState.username,

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
        `${backend_url}/api/posts/write-post`,
        postData
      );

      // Handle the response from your server as needed
      console.log("Post created:", response.data);

      // Show a success notification
      toast.success("Post submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received. Request made but no response.");
      } else {
        console.error("Error setting up the request:", error.message);
      }
      toast.error("Failed to submit the post.");
    }
  };

  return (
    <div className="CreatePost h-[150vh] bg-p flex flex-col items-center justify-center">
      <h3 className="text-center text-2xl md:text-4xl mb-4 font-bold">
        Create a New Post
      </h3>

      <div className="w-[70vw] border border-black p-3 h-[130vh] rounded-xl">
        <div className="mb-4">
          <label htmlFor="title" className="mr-2 uppercase font-semibold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            className="border border-black rounded px-2 py-1  uppercase font-semibold"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mr-2  uppercase font-semibold"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            className="border border-black rounded px-2 py-1 w-[70%]"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="mr-2  uppercase font-semibold">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formState.tags}
            onChange={handleInputChange}
            className="border border-black rounded px-2 py-1  uppercase font-semibold"
          />
        </div>

        <p>write the content here...</p>

        <ReactQuill
          theme="snow"
          value={formState.content}
          onChange={handleContentChange}
          className="mb-4 border border-black bg-white h-[30vh] rounded-xl  uppercase font-semibold"
        />
        <div className="mt-[10vh]">
          <label htmlFor="image  uppercase font-semibold">upload image: </label>
          <button
            onClick={() => widgetRef.current.open()}
            className="border border-black rounded-2xl px-2 py-1 hover:bg-white "
          >
            Upload Image
          </button>
        </div>

        {formState.imageURL && (
          <div className="mb-4  ">
            <h4>Uploaded Image:</h4>
            <img
              src={formState.imageURL}
              className="max-w-full max-h-40 rounded-md"
              alt="Uploaded"
            />
          </div>
        )}
        <div className=" flex justify-center my-5 ">
          <button
            onClick={handleSubmit}
            className="border border-black rounded-2xl px-2 py-1 my-2 hover:bg-white"
          >
            Submit
          </button>
        </div>
        {submitted && (
          <p className="text-green-600 text-center font-semibold">
            Post submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
}
