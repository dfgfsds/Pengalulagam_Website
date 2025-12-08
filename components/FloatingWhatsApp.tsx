// components/FloatingWhatsApp.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="http://wa.me/919025273076"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
