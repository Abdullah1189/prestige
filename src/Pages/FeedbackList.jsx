import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchApprovedFeedback = async () => {
      try {
        const q = query(
          collection(db, "feedback"),
          where("status", "==", "approved")
        );
        const querySnapshot = await getDocs(q);
        setFeedbackList(querySnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchApprovedFeedback();
  }, []);

  return (
    <div className="bg-gray-100 py-12 ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Feedback from Our Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbackList.map((feedback, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 border-t-4"
              style={{
                borderColor:
                  index % 3 === 0
                    ? "#f59e0b" // orange
                    : index % 3 === 1
                    ? "#ef4444" // red
                    : "#8b5cf6", // purple
              }}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {feedback.userName}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{feedback.email}</p>
              <p className="mt-4 text-gray-700 text-lg">{feedback.message}</p>
              <div className="mt-4">
 <div className="flex items-center space-x-1">
   {[...Array(5)].map((_, index) => (
     <svg
       key={index}
       xmlns="http://www.w3.org/2000/svg"
       className={`h-5 w-5 ${
         feedback.rating > index
           ? "text-yellow-500"
           : "text-gray-300"
       }`}
       fill="currentColor"
       viewBox="0 0 20 20"
     >
       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.43 4.381a1 1 0 00.95.69h4.614c.969 0 1.371 1.24.588 1.81l-3.73 2.79a1 1 0 00-.363 1.118l1.43 4.381c.3.921-.755 1.688-1.54 1.118l-3.73-2.79a1 1 0 00-1.176 0l-3.73 2.79c-.784.57-1.838-.197-1.54-1.118l1.43-4.381a1 1 0 00-.363-1.118l-3.73-2.79c-.783-.57-.38-1.81.588-1.81h4.614a1 1 0 00.95-.69l1.43-4.381z" />
     </svg>
   ))}
 </div>
</div>            
</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
