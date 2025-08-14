"use client";
import RegistrationModal from "../register/registration-modal";
import { useState } from "react";

export default function LandingOpenRegister({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-primary border-2 border-[#e55a3a] hover:bg-[#e55a3a] text-white font-bold rounded-full text-xl drop-shadow-2xl cursor-pointer ${className}`}
      >
        {label}
      </button>
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
