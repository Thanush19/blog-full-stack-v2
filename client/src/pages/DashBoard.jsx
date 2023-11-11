import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import backend_url from "../../utils/constants";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const DashBoard = () => {
  const { userId } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();

  const [postDetails, setPostDetails] = useState({
    post_count: 0,
    tags: [],
    timestamps: [],
  });

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/posts/details/${userId}`
        );
        setPostDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch post details:", error.message);
        console.error("Error response:", error.response);
      }
    };

    if (isSignedIn) {
      fetchPostDetails();
    }
  }, [isSignedIn, userId]);

  return (
    <>
      <h1>
        Hello! {user.firstName} {user.lastName}
      </h1>
      <hr />
      <p>Email Address: {user.emailAddresses[0]?.emailAddress}</p>
      {isSignedIn && (
        <div>
          <h2>Your Post Details</h2>
          <p>Total Posts: {postDetails.post_count}</p>
          <p>
            Tags Used:{" "}
            {postDetails.tags ? postDetails.tags.join(", ") : "No tags"}
          </p>
          <p>
            Post Timestamps:{" "}
            {postDetails.timestamps
              ? postDetails.timestamps.map(formatDate).join(", ")
              : "No timestamps"}
          </p>
        </div>
      )}
    </>
  );
};

export default DashBoard;
