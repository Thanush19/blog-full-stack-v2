import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { CloudinaryContext } from "cloudinary-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}
  >
    <CloudinaryContext cloudName="ddxqeeype">
      <App />
    </CloudinaryContext>
  </ClerkProvider>
);

//api key 452474812582573
//api secret OD2NFCH7P8a33aYq8-3-rZ02Ysc
//upload preset blog-thanush
//            .post("https://api.cloudinary.com/v1_1/ddxqeeype/image/upload", {
