import prisma from "@/libs/Prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res_) {
  try {
    const headerList = headers();

    const id = parseInt(headerList.get("id"));
    const result = await prisma.users.findUnique({
      where: { id: id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        mobile: true,
        otp: true,
        password: false,
      },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
