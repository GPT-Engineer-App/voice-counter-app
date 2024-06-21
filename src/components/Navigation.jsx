import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    // Navigation container with background color and padding
    <nav className="bg-brand-700 text-white py-2" role="navigation">
      {/* Flex container to center the navigation links */}
      <div className="flex justify-center max-w-screen-lg mx-auto px-4">
        {/* Navigation links with margin for spacing */}
        <Link to="/" className="mx-2">
          Home
        </Link>
        <Link to="/history" className="mx-2">
          History
        </Link>
        <Link to="/contact" className="mx-2">
          Contact
        </Link>
        <Link to="/settings" className="mx-2">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;