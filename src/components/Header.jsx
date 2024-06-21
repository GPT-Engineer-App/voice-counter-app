import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-brand-800 text-white py-4" role="banner">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-lg">
          <Link to="/">My Application</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;