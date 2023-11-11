import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import ProtectedRoute from "../utils/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import AllPost from "./pages/AllPost";
import SinglePost from "./pages/SinglePost";
import DashBoard from "./pages/DashBoard";
import { useUser, useAuth } from "@clerk/clerk-react";
import MyBlogs from "./pages/MyBlogs";
import EditPost from "./pages/EditPost";

function App() {
  const { userId, sessionId, getToken } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/all-posts"
          element={
            <ProtectedRoute>
              <AllPost />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <AllPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-blogs/:userId"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Base delivery URL
// http://res.cloudinary.com/ddxqeeype
//api cloudinary secret OD2NFCH7P8a33aYq8-3-rZ02Ysc
//cloudName ddxqeeype
//preset
