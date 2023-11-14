import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";
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

const colors = ["#0d395a", "#FFBB28", "#FF8042", "red", "pink"];

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
  const back = useNavigate();
  const backfn = () => {
    back(-1);
  };
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
          `${backend_url}/api/posts/details/${userId}`
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

  const groupedData = postDetails.timestamps.reduce((acc, timestamp) => {
    const key = formatDate(timestamp);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((key) => ({
    name: key,
    uv: groupedData[key],
    amt: 2400,
  }));

  const uniqueTags = [...new Set(postDetails.tags)];

  return (
    <div className="bg-p">
      <button
        className="bg-white text-black px-4 py-2 rounded-2xl hover:text-white hover:bg-black mb-4"
        onClick={backfn}
      >
        Back
      </button>
      {isSignedIn && isLoaded && user ? (
        <>
          <h1 className="text-3xl  italic font-bold text-center p-[10vh]">
            Hello! {user.firstName} {user.lastName}
          </h1>
          <p className="text-center text-2xl font-semibold italic">
            This is your personalised dashboard
          </p>
          <p>
            {" "}
            <span className="font-semibold">Email Address: </span>
            <span className="italic">
              {user.emailAddresses[0]?.emailAddress}
            </span>
          </p>
          <div className="mt-5">
            <h2 className="text-center text-3xl underline ">
              Your Post Details
            </h2>
            <p className="my-4 ">
              <span className="font-semibold text-xl mb-5">Total Posts:</span>{" "}
              <span className="text-xl"> {postDetails.post_count}</span>
            </p>
            {postDetails.timestamps.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 50,
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
          <p className="text-center text-2xl font-semibold underline italic">
            Posts you are interested in..
          </p>
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
    </div>
  );
};

export default DashBoard;
