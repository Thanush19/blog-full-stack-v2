import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const NavBar = () => {
  const { userId } = useAuth();

  return (
    <div className="flex flex-row justify-end items-center h-[5vh] m-2 -top-[21vh] relative -right-[30vw] md:-right-[38vw] md:-top-[24vh] ">
      <UserButton />
      <Link to={`/dashboard/${userId}`} className="ml-2">
        <button className="text-white bg-black py-2 px-4 rounded hover:border-white hover:border-2">
          Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NavBar;
