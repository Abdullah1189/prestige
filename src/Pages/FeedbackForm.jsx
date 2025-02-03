import FeedbackList from './FeedbackList'
import React, { useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0); // Star rating
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      await addDoc(collection(db, "feedback"), {
        userName,
        email,
        message,
        rating, // Include rating
        status: "pending",
        createdAt: Timestamp.now(),
      });

      setLoading(false); // Stop loader
      toast.success("🎉 Your feedback has been submitted successfully!", {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
      });

      // Reset form fields
      setUserName("");
      setEmail("");
      setMessage("");
      setRating(0);

      // Redirect after 10 seconds
      setTimeout(() => {
        navigate("/");
      }, 10000); // 10 seconds
    } catch (error) {
      setLoading(false); // Stop loader
      toast.error("⚠️ An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error adding feedback: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-16">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Submit Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Experience with our services!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Star Rating Component */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                className={`text-4xl  ${
                  rating > index ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center my-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />


      <FeedbackList />

    </div>
  );
};

export default FeedbackForm;



