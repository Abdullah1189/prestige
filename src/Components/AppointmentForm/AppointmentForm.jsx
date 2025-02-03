import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Title from "../../assets/Appointment.jfif";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS


const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bidData = location.state || {}; // Data passed from the Bid page

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    address: "",
    appointmentDate: new Date(), // Initialize with current date
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, appointmentDate: date }));
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, phoneNumber } = formData;

    // Validate Name: only alphabets and spaces allowed
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      toast.error("Name should only contain alphabets and spaces.");
      return;
    }

    // Validate Phone Number: only digits, and exactly 10 digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    setLoading(true);
    toast.loading("Submitting your appointment...");

    setTimeout(() => {
      setLoading(false);
      toast.dismiss();
      toast.success("Appointment submitted successfully!");

      // Combine bid data with form data
      const combinedData = { ...bidData, ...formData };

      // Navigate to Checkout page with combined data
      navigate("/checkout", { state: combinedData });
    }, 2000); // Simulate API submission
  };

  const handleGoBack = () => {
    toast("Returning to the Bid page...");
    navigate("/bid");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-4 mt-16">
      <Toaster />
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src={Title}
            alt="Header"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Your Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
                +92
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="300-0000000"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Complete Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium">
              Complete Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

           {/* Appointment Date (using DatePicker) */}
           <div>
                    <label htmlFor="appointmentDate" className="block text-gray-700 font-medium">
                        Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                        selected={formData.appointmentDate}
                        onChange={handleDateChange}
                        minDate={new Date()} // Optional: Disable past dates
                        dateFormat="MM/dd/yyyy"  // Customize the date format
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholderText="Select Date"
                        required
                    />
                </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Any details..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300 transition"
            >
              Go Back
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md transition ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
