import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Logo from "../../assets/LOGO/second logo_processed.png"; // Import the logo
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Error during logout:", error));
  };

  const handleLinkClick = () => setMenuOpen(false);

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 w-full text-black shadow-md z-50"
      style={{
        background: "linear-gradient(to left, rgb(13, 148, 136), rgb(255, 255, 255))",
      }}
    >
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left Side: Logo */}
        <div>
          <Link to="/" onClick={handleLinkClick}>
            <img
              src={Logo}
              alt="Prestige Detailing Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Right Side: Navigation Links */}
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <ul
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-full text-center bg-gradient-to-l from-teal-500 to-white rounded font-semibold right-0 w-full p-4 md:static md:flex md:space-x-6 md:p-0`}
          >
            <li>
              <Link
                to="/gallery"
                className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                  isActive("/gallery")
                    ? "bg-teal-600 text-white"
                    : "hover:bg-teal-600 hover:text-white"
                }`}
                onClick={handleLinkClick}
              >
                Gallery
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/services"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/services")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessories"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/accessories")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/feedback")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/profile")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                    className="block text-lg py-2 px-4 bg-red-500 hover:text-white rounded-md transition-all duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/login")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={`block text-lg py-2 px-4 rounded-md transition-all duration-300 ${
                      isActive("/signup")
                        ? "bg-teal-600 text-white"
                        : "hover:bg-teal-600 hover:text-white"
                    }`}
                    onClick={handleLinkClick}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
