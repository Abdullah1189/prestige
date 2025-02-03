import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { auth, db } from "../firebase/firebase.config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/LOGO/second logo.png";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    setLoading(true);

    try {
      const result = await signIn(email, password);
      toast.success("You Successfully Logged In");
      navigate(location?.state ? location.state : "/profile");
    } catch (error) {
      toast.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);

      if (!userSnap.exists()) {
        const userData = {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ").slice(1).join(" "),
          email: user.email,
          createdAt: new Date().toISOString(),
        };

        await setDoc(userDoc, userData);
      }

      toast.success("You Signed in Successfully");
      navigate(location?.state ? location.state : "/profile");
    } catch (error) {
      toast.error("Google Sign-In Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-4">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl">
        {/* Right Column (Logo and Welcome Message) */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center text-white p-8">
          <img src={Logo} alt="Admin Logo" className="w-3/4 mb-8" />
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        </div>
  
        {/* Left Column (Form) */}
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Log in
          </h1>
  
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="block text-sm  text-gray-700 mb-2 font-bold ">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <div className="form-control relative">
              <label className="block text-sm  text-gray-700 mb-2 font-bold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
  
            <p className="text-right text-sm mt-1">
              <Link
                to="/forgot-password"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </p>
  
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
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
  
          <Toaster />
  
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center font-bold justify-center gap-2 py-3 bg-gray-100 border border-blue-500 rounded-lg hover:bg-yellow-200 transition duration-200"
            >
              <FaGoogle />
              Sign in with Google
            </button>
          </div>
  
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
