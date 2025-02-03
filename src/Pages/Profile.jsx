import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'; // Import icons
import toast, { Toaster } from "react-hot-toast";




function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newData, setNewData] = useState(null);
    const [tokenPoints, setTokenPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userRef = doc(db, "users", authUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`;
                    const userWithFullName = { ...userData, name: fullName, id: authUser.uid }; // Include the id!
                    setUser(userWithFullName);
                    setNewData({ ...userWithFullName }); // Initialize newData correctly
                    setTokenPoints(userData.tokenPoints || 0);
                    setProfilePhoto(localStorage.getItem("profilePhoto") || "https://via.placeholder.com/150");
                } else {
                    console.error("User document not found!");
                    navigate('/products');
                }
            } else {
                navigate('/login');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [navigate]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePhoto(reader.result);
                localStorage.setItem("profilePhoto", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => { // New input change handler
      const { name, value } = e.target;
      setNewData({ ...newData, [name]: value });
  };

  const handleSave = async () => {
    try {
        const { name, ...updatedData } = newData;
        const [firstName, lastName] = name.split(" ");
        const finalUpdateData = { ...updatedData, firstName, lastName };
        await updateDoc(doc(db, "users", user.id), finalUpdateData); // user.id is now available
        const updatedUser = { ...user, name: name, firstName, lastName };
        setUser(updatedUser);
        setNewData(updatedUser);
        setIsEditing(false);
// Show success toast
toast.success("✅ Profile updated successfully!", {
  position: "top-center",
  duration: 4000,
});
    } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("❌ Error updating profile. Please try again.", {
          position: "top-center",
          duration: 4000,
      });    }
};

if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        
      </div>
    );
  }

if (!user) {
  return <div className="flex justify-center items-center h-screen">User not found.</div>; // Centered message
}


return (
  <div className="bg-gray-100 min-h-screen p-6 mt-16 flex flex-col items-center transition-all duration-300"> {/* Main container styling */}
  <Toaster />
      <div className="bg-white shadow-lg rounded-lg w-full border-4  max-w-3xl p-8 text-center hover:scale-105 transition-transform duration-300">
          <div className="relative mb-6">
              <label htmlFor="profilePhotoInput" className="cursor-pointer">
                  <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-32 h-32 mx-auto rounded-full shadow-md border-4 border-blue-500 hover:scale-110 transition-transform duration-300" // Blue border
                  />
              </label>
              <input
                  type="file"
                  id="profilePhotoInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
              />
          </div>

          {isEditing ? (
              <div className="space-y-4">
                  <input
                      type="text"
                      name="name"
                      value={newData.name}
                      onChange={handleInputChange}
                      className="block w-full border border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200 transition-all duration-300" // Blue border and focus
                      placeholder="Full Name"
                  />
                  <input
                      type="text"
                      name="location"
                      value={newData.location}
                      onChange={handleInputChange}
                      className="block w-full border border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200 transition-all duration-300" // Blue border and focus
                      placeholder="Location"
                  />
                  <textarea
                      name="description"
                      value={newData.description}
                      onChange={handleInputChange}
                      className="block w-full border border-blue-500 rounded p-2 focus:ring-2 focus:ring-blue-200 transition-all duration-300" // Blue border and focus
                      placeholder="Description"
                      rows="3"
                  />
                  <button onClick={handleSave} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300"> {/* Blue button */}
                      Save
                  </button>
              </div>
          ) : (
              <div className="space-y-4">
                  <h2 className="text-3xl font-bold mt-2 hover:text-blue-700 transition-colors duration-300">{user.name}</h2>
                  <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"> {/* Email with icon */}
                      <FaEnvelope className="mr-2" /> {user.email} {/* Assuming email is in user data */}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"> {/* Location with icon */}
                      <FaMapMarkerAlt className="mr-2" /> {user.location}
                  </div>
                   {/* <h2 className="text-blue-700 text-center font-bold ">Description:</h2> */}
                  <p className="text-gray-700 mt-2 font-serif">{user.description}</p>
                  <p className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg inline-block mt-8 hover:bg-blue-200 transition-colors duration-300"> {/* Blue points display */}
                      Loyalty Points: {tokenPoints}
                  </p>
                  <button
                      onClick={() => {
                          setNewData({ ...user });
                          setIsEditing(true);
                      }}
                      className="mt-4 ml-10 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300" // Blue button
                  >
                      Edit Profile
                  </button>
              </div>
          )}
      </div>
  </div>
);
}
export default Profile;





{/* Booking History */}
  {/* <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 mt-6">
    <h3 className="text-xl font-bold mb-4 text-teal-700">Booking History</h3>
    <ul className="space-y-4">
      {user.bookingHistory.map((booking) => (
        <li
          key={booking.id}
          className="flex justify-between items-center bg-teal-50 p-4 rounded-lg shadow"
        >
          <div>
            <p className="text-lg font-bold">{booking.service}</p>
            <p className="text-sm text-gray-600">Date: {booking.date}</p>
            <p className="text-sm text-gray-600">Location: {booking.location}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-white ${
              booking.status === "On the way" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            {booking.status}
          </span>
        </li>
      ))}
    </ul>
  </div> */}
// </div>
// );
// }
