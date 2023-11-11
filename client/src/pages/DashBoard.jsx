import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import backend_url from "../../utils/constants";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = ["#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
      Z`;
  };

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
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

  // Group data by month and calculate post count for each month
  const groupedData = postDetails.timestamps.reduce((acc, timestamp) => {
    const key = formatDate(timestamp);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Convert grouped data to an array for charting
  const chartData = Object.keys(groupedData).map((key) => ({
    name: key,
    uv: groupedData[key],
    amt: 2400,
  }));

  // Create an array of unique tags
  const uniqueTags = [...new Set(postDetails.tags)];

  return (
    <>
      {isSignedIn && isLoaded && user ? (
        <>
          <h1>
            Hello! {user.firstName} {user.lastName}
          </h1>
          <hr />
          <p>Email Address: {user.emailAddresses[0]?.emailAddress}</p>
          <div>
            <h2>Your Post Details</h2>
            <p>Total Posts: {postDetails.post_count}</p>
            {postDetails.timestamps.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 50, // Increased bottom margin to accommodate axis labels
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name">
                    <Label
                      value="Timeline"
                      position="insideBottom"
                      offset={-10} // Adjust the offset as needed
                    />
                  </XAxis>
                  <YAxis
                    label={{
                      value: "No. of Posts",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No post data to display</p>
            )}
          </div>
          <h1>Posts you are interested in..</h1>
          {uniqueTags.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={uniqueTags.map((tag) => ({ name: tag, value: 1 }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {uniqueTags.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default DashBoard;
