# Footer component to display the footer section of the application
const Footer = () => {
  // Return the JSX for the footer
  return (
    // Tailwind CSS classes for styling the footer
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      {/* Display the current year and application name */}
      <p className="text-center">© {new Date().getFullYear()} My Application. All rights reserved.</p>
    </footer>
  );
};

export default Footer; // Export the Footer component as the default export