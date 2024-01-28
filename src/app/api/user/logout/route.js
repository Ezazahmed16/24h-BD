import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    cookies().delete("token");
    return NextResponse.json({
      status: true,
      msg: "Logout successful",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
