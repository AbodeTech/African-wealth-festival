"use server";

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  employmentStatus: string;
  howDidYouHear: string;
  ageRange: string;
  referrerName?: string;
};

export const apiFormHanlder = async (body: FormData) => {
  const API_Base_Url = process.env.NEXT_APP_BACKEND_API_URL;

  if (!API_Base_Url) {
    throw new Error("NEXT_APP_BACKEND_API_URL is not defined");
  }
  try {
    const request = await fetch(API_Base_Url + "forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      throw new Error("Registration failed");
    }

    const result = await request.json();
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error; // so it can be handled upstream
  }
};
