import React from "react";

const WhatsappButton = () => {
  const consultantPhoneNumber = "+923484484933"; // Replace with the consultant's number
  const message = "Hi, I would like to consult with you."; // Optional predefined message

  const whatsappLink = `https://wa.me/${consultantPhoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with Consultant" 
      className="fixed bottom-8 right-5  z-50 bg-green-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md transition duration-300 ease-in-out hover:bg-green-500"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-9 h-9"
      />
    </a>
  );
};

export default WhatsappButton;
