import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import backend_url from "../../utils/constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faAt } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

const AllPost = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };

    fetchPosts();
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="p-6">
      <button
        className="bg-black text-white  px-4 py-2 rounded-2xl  "
        onClick={goBack}
      >
        Back
      </button>
      <h1 className="text-2xl font-bold text-center">Latest News</h1>

      <div className="text-black bg-p p-6 border rounded-xl">
        {posts.map((post) => (
          <div key={post.post_id} className="my-4 flex flex-col md:flex-row">
            <div className="md:mr-4 md:w-[30%] w-[30%]  mb-4 md:mb-0">
              <img src={post.image} alt={post.title} className="w-full" />
            </div>
            <div className="mx-auto">
              <h3 className="text-2xl font-bold uppercase">{post.title}</h3>
              <p className="italic flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                {moment(post.timestamp).fromNow()}
              </p>
              <p className="italic flex items-center">
                <span>
                  <FontAwesomeIcon icon={faAt} />
                </span>
                {post.username}
              </p>
              <p className="font-semibold">{post.description}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${post.content.slice(0, 50)}`,
                }}
              ></div>
              <button className="bg-black text-white m-2 rounded-xl p-3">
                <Link to={`/post/${post.post_id}`}>Continue reading...</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
