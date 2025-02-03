import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import Logo from "../assets/LOGO/second logo.png"; // Use the admin logo

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    tokenPoints: 0,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setIsLoading(true);

    const { fname, lname, email, password } = formData;

    if (password.length < 6) {
      const error = "⚠️ Password should be at least 6 characters.";
      setRegisterError(error);
      toast.error(error);
      setIsLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      const error = "⚠️ Password should have at least one uppercase character.";
      setRegisterError(error);
      toast.error(error);
      setIsLoading(false);
      return;
    }
    if (!/[@#$%^&+*!=]/.test(password)) {
      const error = "⚠️ Password must contain one special character.";
      setRegisterError(error);
      toast.error(error);
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${fname} ${lname}`,
      });

      const userData = {
        firstName: fname,
        lastName: lname,
        email: email,
        tokenPoints: 0,
        location: "Kotla arab  ali khan",
        description: "I love to keep my car clean and shiny",
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      toast.success("🎉 Registration successful! Welcome!");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/profile");
      }, 4000);
    } catch (error) {
      const errorMsg = `❌ Registration failed: ${error.message}`;
      setRegisterError(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <Toaster />
      <div className=" flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xl md:max-w-3xl lg:max-w-4xl">
        {/* Right Column (Logo and Welcome Message) - Hidden on Mobile */}
        <div className="w-1/2 bg-white flex-col justify-center items-center text-white p-8 hidden md:flex">
          <img src={Logo} alt="Admin Logo" className="w-3/4 mb-8" />
          <h1 className="text-3xl font-bold mb-4 text-black">Welcome!</h1>
          <p className="block text-xl text-gray-700 mb-2 font-bold text-center">
            Join us today to enjoy all the amazing features.
          </p>
        </div>

        {/* Left Column (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className=" mt-12 text-3xl font-bold text-blue-600 mb-6 text-center">Register</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name */}
            <div className="form-control">
              <label className="block text-sm text-gray-700 mb-2 font-bold">First Name</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {/* Last Name */}
            <div className="form-control">
              <label className="block text-sm text-gray-700 mb-2 font-bold">Last Name</label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="block text-sm text-gray-700 mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {/* Password */}
            <div className="form-control relative">
              <label className="block text-sm text-gray-700 mb-2 font-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Register Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          {registerError && <p className="text-red-500 text-center mt-4">{registerError}</p>}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
