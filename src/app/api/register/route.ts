import { type NextRequest, NextResponse } from "next/server";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  employmentStatus: string;
  ageRange: string;
  howDidYouHear: string;
  referrerName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();
    const API_Base_Url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!API_Base_Url) {
      return NextResponse.json(
        { success: false, message: "API configuration error" },
        { status: 500 }
      );
    }
    const response = await fetch(`${API_Base_Url}forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.log("API Error:", await response.text());
      return NextResponse.json(
        { success: false, message: "Registration failed" },
        { status: response.status }
      );
    }
    const result = await response.json();
    console.log("API Response:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}
