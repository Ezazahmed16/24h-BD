import prisma from "@/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const result = await prisma.news_list.findMany({
      where: { type: type },
      orderBy: { id: "desc" },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
