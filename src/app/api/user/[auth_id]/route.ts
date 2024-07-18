import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DB接続
async function doConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("DB接続に失敗しました");
  }
}

// ユーザー情報 取得API
export const GET = async (req: Request) => {
  const auth_id: string = req.url.split("/user/")[1];

  try {
    await doConnect();
    const user = await prisma.user.findUnique({
      where: { auth_id },
      include: {
        posts: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ユーザー情報 編集API
export const PUT = async (req: Request) => {
  try {
    const { email, name } = await req.json();

    const auth_id: string = req.url.split("/user/")[1];

    await doConnect();

    const user = await prisma.user.update({
      where: { auth_id },
      data: {
        email,
        name,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
