import { useState } from "react";

const FAQ = () => {
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What services do you offer?",
      answer:
        "We offer a wide range of services including vehicle detailing, washing, polishing, and protective coatings. Contact us for more details.",
    },
    {
      id: 2,
      question: "Do you offer mobile services?",
      answer:
        "Yes, we provide mobile detailing services. Our team can come to your location at your convenience.",
    },
    {
      id: 3,
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website or by giving us a call. We recommend booking in advance for your preferred time slot.",
    },
    {
      id: 4,
      question: "How often should I have my car detailed?",
      answer:
        "It depends on your driving habits and environmental conditions. Generally, it's recommended to detail your car every 4-6 months to maintain its condition and protect it from dirt, UV rays, and contaminants. Regular detailing can also extend the lifespan of your car's paint and interior materials.",
    },
    {
      id: 5,
      question: "What is your experience level in car detailing?",
      answer:
        "Our team has years of experience in professional car detailing, servicing a wide range of vehicles, from daily drivers to luxury and exotic cars. We are committed to using high-quality products and techniques to deliver exceptional results.",
    },
  ];

  // State to manage open/close FAQs
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle function
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text md:mb-8 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
          >
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="text-lg">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  openFAQ === faq.id ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openFAQ === faq.id && (
              <div className="px-6 py-4 text-gray-600 bg-gradient-to-r from-teal-100 to-teal-500 border-t rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
