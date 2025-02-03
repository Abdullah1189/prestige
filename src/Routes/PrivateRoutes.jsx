import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Show a loading spinner with toast notification
    toast.loading("Authenticating...");

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <Toaster />
      </div>
    );
  }

  if (!user) {
    // Clear any lingering toast messages and redirect to login if not authenticated
    toast.dismiss();
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Clear any lingering loading toasts once the user is authenticated
  toast.dismiss();

  // Render child components if user is authenticated
  return <div className="py-4">{children}</div>; // Adds space between the navbar and page content
};

export default PrivateRoutes;










