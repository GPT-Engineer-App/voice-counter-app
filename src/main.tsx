
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // Global CSS styles including Tailwind CSS

const Root = () => {
  return (
    <App />  // Main application component
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);  // Initialize React app and render it to the DOM