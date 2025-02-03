import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Forgot Password
        </h1>
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div className="form-control">
            <label className="block text-sm text-gray-700 mb-2 font-bold">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {loading && (
            <div className="flex justify-center my-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
        <Toaster />
        <p className="text-center mt-4">
          Remembered your password?{" "}
          <button
            onClick={handleLoginRedirect} // Call the function to redirect to the login page
            className="text-blue-600 underline hover:text-blue-800"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
