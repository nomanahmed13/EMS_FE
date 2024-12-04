// import React from 'react'
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className="fixed bottom-0 w-full bg-black h-10 flex items-center text-white gap-3">
        <FaCopyright className="ml-4 h-5" />
        Evento EMS
      </div>
    </div>
  );
}

