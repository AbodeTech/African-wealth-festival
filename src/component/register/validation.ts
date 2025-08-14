import { FormErrors } from "./type";

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  employmentStatus: string;
  howDidYouHear: string;
  referrerName: string;
  ageRange: string;
};

export const validateForm = ({
  formData,
}: {
  formData: FormData;
}): FormErrors => {
  const newErrors: FormErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Full name is required";
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
    newErrors.name = "Name can only contain letters and spaces";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  if (!formData.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  } else if (
    !/^[+]?[0-9\s\-$$$$]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))
  ) {
    newErrors.phoneNumber = "Please enter a valid phone number";
  }

  if (!formData.employmentStatus) {
    newErrors.employmentStatus = "Please select your employment status";
  }

  if (!formData.howDidYouHear) {
    newErrors.howDidYouHear = "Please tell us how you heard about this event";
  }
  if (formData.howDidYouHear === "referral" && !formData.referrerName.trim()) {
    newErrors.referrerName =
      "Please enter the name of the person who invited you";
  }

  if (!formData.ageRange) {
    newErrors.ageRange = "Please select your age range";
  }

  return newErrors;
};
