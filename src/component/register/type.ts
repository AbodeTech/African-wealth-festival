export interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  employmentStatus?: string;
  howDidYouHear?: string;
  ageRange?: string;
  referrerName?: string;
}

export interface NotificationState {
  show: boolean;
  success: boolean;
  message: string;
}
