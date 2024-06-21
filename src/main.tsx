import 'regenerator-runtime/runtime';  // Polyfill for async functions
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // Global CSS styles including Tailwind CSS

const Root = () => {
  return (
    <React.StrictMode>  // Enable strict mode for highlighting potential problems
      <App />  // Main application component
    </React.StrictMode>  // End of strict mode
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);  // Initialize React app and render it to the DOM