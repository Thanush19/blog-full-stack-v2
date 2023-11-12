import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import NavBar from "../components/NavBar";
import bg from "../assets/bg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const { userId, sessionId, getToken } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center text-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value as needed
      }}
    >
      <NavBar />
      <div className="mt-5 text-black">
        <h1 className="text-3xl font-bold  md:text-5xl">
          Hello! {user.firstName}
        </h1>
        <hr className="border-t-2 border-black my-4" />
      </div>
      {isSignedIn && (
        <>
          <Link
            className="text-white bg-black py-2 px-4 rounded-2xl hover:border-white hover:border-2"
            to="/create-post"
          >
            Write Blog post
          </Link>
          <br />
          <Link
            className="text-white bg-black py-2 px-4 rounded-2xl hover:border-white hover:border-2  mt-2"
            to="/posts"
          >
            See all blog posts
          </Link>
          <br />
          <Link
            className="text-white bg-black py-2 px-4 rounded-2xl hover:border-white hover:border-2 mt-2"
            to={`/my-blogs/${userId}`}
          >
            My Blogs
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
