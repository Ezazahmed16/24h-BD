import { sendEmail } from "@/Utility/EmailUtility";
import prisma from "@/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const findUser = await prisma.users.count({
      where: { email: email },
    });
    if (findUser === 1) {
      let genarateOtp = Math.floor(100000 + Math.random() * 900000);
      let emailText = `Your OTP Code is ${genarateOtp}`;
      let emailSubject = "Next News Verification Code ";
      await sendEmail(email, emailText, emailSubject);
      const result = await prisma.users.update({
        where: { email: email },
        data: { otp: genarateOtp.toString() },
      });
      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({ status: "fail", data: "user Not Found" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
