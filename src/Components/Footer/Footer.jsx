import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to left, rgb(13, 148, 136), rgb(255, 255, 255))",
      }}
      className="text-gray-700 hover: bg-red-500 hover:text-white"
    >
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Social Icons */}
          <ul className="flex gap-5">
            <li>
              <a
                href="#"
                className="text-2xl text-teal-700 hover:text-teal-900 transition-colors duration-300 fa-brands fa-twitter"
              ></a>
            </li>
            <li>
              <a
                href="#"
                className="text-2xl text-teal-700 hover:text-blue-700 transition-colors duration-300 fa-brands fa-facebook"
              ></a>
            </li>
            <li>
              <a
                href="#"
                className="text-2xl text-teal-700 hover:text-blue-500 transition-colors duration-300 fa-brands fa-linkedin"
              ></a>
            </li>
          </ul>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-teal-700 transition-colors duration-300 font-semibold"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-700 transition-colors duration-300 font-semibold"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="hover:text-teal-700 transition-colors duration-300 font-semibold"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="hover:text-teal-700 transition-colors duration-300 font-semibold"
              >
                Sign up
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-700 transition-colors duration-300 font-semibold"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-teal-800">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
