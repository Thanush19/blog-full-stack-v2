import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backend_url from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faAt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const MyBlogs = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const back = useNavigate();
  const backfn = () => {
    back(-1);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/posts?user_id=${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="mt-[10vh]">
      <h1 className="text-center font-bold text-2xl md:text-4xl uppercase">
        My Blogs
      </h1>
      <button
        onClick={backfn}
        className="bg-black text-white p-3 rounded-xl ml-[2rem]"
      >
        back
      </button>
      <div className="p-6">
        <div className="text-black bg-p p-4 md:p-6 border rounded-xl  ">
          {posts.map((post) => (
            <div key={post.post_id} className="my-4 flex flex-col md:flex-row">
              <div className="md:mr-4 md:w-[30%] w-full  mb-4 order-1 md:order-1 mx-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className=" h-40 mx-auto object-cover md:h-auto"
                />
              </div>
              <div className="mx-auto order-2 md:order-2 w-full md:w-[60%]">
                <h3 className="text-2xl font-bold uppercase text-center ">
                  {post.title}
                </h3>
                <p className="italic flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  {moment(post.timestamp).fromNow()}
                </p>
                <p className="italic flex items-center text-sm md:text-base">
                  <span>
                    <FontAwesomeIcon icon={faAt} />
                  </span>
                  {post.username}
                </p>
                <p className="font-semibold text-sm md:text-base">
                  {post.description}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${post.content.slice(0, 100)}`,
                  }}
                  className="text-sm md:text-base"
                ></div>
                <div className="flex justify-between">
                  <button className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base">
                    <Link to={`/post/${post.post_id}`}>
                      Continue reading...
                    </Link>
                  </button>
                  <button className="bg-black text-white  rounded-xl p-2 md:p-3 text-sm md:text-base">
                    <Link
                      to={`/edit/${post.post_id}`}
                      className="text-sm md:text-base"
                    >
                      Edit
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
