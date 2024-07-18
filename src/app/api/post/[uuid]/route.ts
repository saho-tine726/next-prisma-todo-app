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

// post詳細記事 取得API
export const GET = async (req: Request) => {
  try {
    const uuid: string = req.url.split("/post/")[1];

    await doConnect();

    const post = await prisma.post.findFirst({
      where: {
        uuid,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// post詳細記事 編集API
export const PUT = async (req: Request) => {
  try {
    const { title, content, authorId } = await req.json();

    const uuid: string = req.url.split("/post/")[1];

    await doConnect();

    const post = await prisma.post.update({
      data: {
        title,
        content,
        authorId,
      },
      where: {
        uuid,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// post詳細記事 削除API
export const DELETE = async (req: Request) => {
  try {
    const uuid: string = req.url.split("/post/")[1];

    await doConnect();

    const post = await prisma.post.delete({
      where: {
        uuid,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
