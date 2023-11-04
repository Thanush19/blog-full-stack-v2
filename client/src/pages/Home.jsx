import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
const Home = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };
  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      <div className="mt-5">
        <h1>
          Hello! {user.firstName} {user.lastName}
        </h1>
        <hr />
        <p>Username: {user.username}</p>
        <p>Email Address: {user.emailAddresses[0].emailAddress}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <UserButton />
    </>
  );
};

export default Home;
