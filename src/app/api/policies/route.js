import prisma from "@/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const result = await prisma.policies.findMany({
      where: { type: type },
    });

    return NextResponse.json({
      status: "success",
      total: result.length,
      data: result,
    });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.toString() });
  }
}
