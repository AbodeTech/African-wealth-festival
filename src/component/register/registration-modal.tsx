"use client";

import type React from "react";
import { useState } from "react";
import { apiFormHanlder } from "@/lib/api/formsubmit";
import { validateForm } from "./validation";
import { NotificationState, RegistrationModalProps, FormErrors } from "./type";
import { Notification } from "../notification/notification";

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  employmentStatus: string;
  howDidYouHear: string;
  ageRange: string;
  referrerName?: string;
};

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    employmentStatus: "",
    howDidYouHear: "",
    ageRange: "",
    referrerName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    success: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setNotification({ show: false, success: false, message: "" });

    const formErrors = validateForm({ formData });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const cleanedData: FormData = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          employmentStatus: formData.employmentStatus,
          howDidYouHear: formData.howDidYouHear,
          ageRange: formData.ageRange,
        };

        if (
          formData.howDidYouHear === "referral" &&
          formData.referrerName.trim()
        ) {
          cleanedData.referrerName = formData.referrerName;
        }

        console.log("Registration data:", cleanedData);
        const result = await apiFormHanlder(cleanedData);
        if (result.success) {
          setNotification({
            show: true,
            success: result.success,
            message:
              result.message ||
              "Registration successful! Your ticket has been secured.",
          });

          setTimeout(() => {
            onClose();
            setFormData({
              name: "",
              email: "",
              phoneNumber: "",
              employmentStatus: "",
              howDidYouHear: "",
              ageRange: "",
              referrerName: "",
            });
            setNotification({ show: false, success: false, message: "" });
          }, 2000);
        } else {
          setNotification({
            show: true,
            success: result.success,
            message:
              result.error.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setNotification({
          show: true,
          success: false,
          message:
            "Network error. Please check your connection and try again later.",
        });
      }
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-4">
          <div className="text-center mb-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Join AWF 2025
            </h2>
            <p className="text-gray-600 text-sm">
              Secure your spot at Africa&apos;s premier wealth creation event
            </p>
          </div>
          {notification.show && (
            <Notification
              success={notification.success}
              message={notification.message}
            />
          )}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                Full Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                Email Address <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                Phone Number <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
                placeholder="xxxx xxx xxxx"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            {/* Age range  */}
            <div className="space-y-2">
              <label
                htmlFor="ageRange"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                Age Range <span className="text-orange-500">*</span>
              </label>
              <select
                id="ageRange"
                name="ageRange"
                required
                value={formData.ageRange}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer ${
                  errors.ageRange
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              >
                <option value="">Select your age range</option>
                <option value="0-17">Under 18 years</option>
                <option value="18-24">18–24 years</option>
                <option value="25-34">25–34 years</option>
                <option value="35-44">35–44 years</option>
                <option value="45-54">45–54 years</option>
                <option value="55-64">55–64 years</option>
                <option value="65+">65 years and above</option>
              </select>
              {errors.ageRange && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.ageRange}
                </p>
              )}
            </div>

            {/* Employment Status */}
            <div className="space-y-2">
              <label
                htmlFor="employmentStatus"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                Employment Status <span className="text-orange-500">*</span>
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                required
                value={formData.employmentStatus}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer ${
                  errors.employmentStatus
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              >
                <option value="">Select your status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
              {errors.employmentStatus && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.employmentStatus}
                </p>
              )}
            </div>

            {/* How did you hear about us */}
            <div className="space-y-2">
              <label
                htmlFor="hearAbout"
                className="block text-sm font-semibold text-gray-800 text-start"
              >
                How did you hear about this event?{" "}
                <span className="text-orange-500">*</span>
              </label>
              <select
                id="howDidYouHear"
                name="howDidYouHear"
                required
                value={formData.howDidYouHear}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer ${
                  errors.howDidYouHear
                    ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              >
                <option value="">Select an option</option>
                <option value="referral">Someone invited me</option>
                <option value="social-media">Social Media</option>
                <option value="billboard">Billboard</option>
                <option value="email-newsletter">Email Newsletter</option>
                <option value="associate">Associate</option>
                <option value="other">Other</option>
              </select>
              {errors.howDidYouHear && (
                <p className="text-red-500 text-sm mt-1 text-start">
                  {errors.howDidYouHear}
                </p>
              )}
            </div>
            {formData.howDidYouHear === "referral" && (
              <div className="space-y-2">
                <label
                  htmlFor="referrerName"
                  className="block text-sm font-semibold text-gray-800 text-start"
                >
                  Referral&apos;s Name{" "}
                  <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="referrerName"
                  name="referrerName"
                  required
                  value={formData.referrerName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
                    errors.referrerName
                      ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  }`}
                  placeholder="Enter the name of the person who referred you"
                />
                {errors.referrerName && (
                  <p className="text-red-500 text-sm mt-1 text-start">
                    {errors.referrerName}
                  </p>
                )}
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-secondary cursor-pointer border-2 ${
                  isSubmitting
                    ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-[#e55a3a] text-white hover:scale-[1.02] hover:shadow-lg border-primary hover:border-secondary"
                }`}
              >
                {isSubmitting
                  ? "Securing Your Ticket..."
                  : "Secure My FREE Ticket"}
              </button>
            </div>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By registering, you agree to receive event updates and
              communications about the Africa Wealth Festival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
