import React, { useEffect, useState } from "react";
import axios from "axios";
import backend_url from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faAt } from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

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

  const goBack = () => {
    navigate(-1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-p p-10">
      <button
        className="bg-white text-black  px-4 py-2 rounded-2xl hover:text-white hover:bg-black "
        onClick={goBack}
      >
        Back
      </button>
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
  );
};

export default SinglePost;
