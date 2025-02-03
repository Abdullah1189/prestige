import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const Newsletter = () => {
    return (
        <div className="w-full h-[400px] flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/assets/newsletter-bg.jpeg')` }}>
            <div className="flex flex-col items-center mx-auto text-center">
                <span className="mb-4 text-sm uppercase text-gray-500">
                    Newsletter
                </span>
                <span className="mb-6 text-xl md:text-2xl font-medium uppercase px-4">
                    Sign up for latest updates and offers
                </span>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Email Address"
                        className="w-48 md:w-72 h-10 border border-gray-300 px-3 text-base outline-none"
                    />
                    <button className="h-10 w-28 md:w-32 text-white text-base bg-gradient-to-r from-purple-600 to-purple-700 border-b-4 border-purple-900 flex items-center justify-center">
                        Subscribe
                    </button>
                </div>
                <span className="mb-5 text-xs text-gray-500">
                    Will be used in accordance with our Privacy Policy
                </span>
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-white">
                        <FaLinkedinIn size={14} />
                    </div>
                    <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-white">
                        <FaFacebookF size={14} />
                    </div>
                    <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-white">
                        <FaTwitter size={14} />
                    </div>
                    <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-white">
                        <FaInstagram size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
