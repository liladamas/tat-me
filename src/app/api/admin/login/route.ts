import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (username === "admin" && password === "tatme2026") {
      // Await the cookie store in Next 15+
      const cookieStore = await cookies();
      
      cookieStore.set({
        name: "admin_session",
        value: "authenticated",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}