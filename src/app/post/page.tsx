"use client";
import Link from "next/link";
import useUser, { useRequireAuth } from "@/hooks/useUser";
import { PostType } from "@/types/post";

const PostList = () => {
  const { session, user } = useUser();

  useRequireAuth();

  if (!session) {
    return null;
  }

  return (
    <main className="max-w-[1000px] mx-auto py-6">
      <div className="px-6 py-10 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">TODO一覧</h1>
        <div className="mb-6">
          <Link href="/post/add" className="bg-teal-500 px-3 sm:px-4 py-2 rounded-md text-white text-md font-medium transition duration-500 hover:bg-teal-600">やることを追加する</Link>
        </div>

        {user?.posts.length != 0 ? (
          user?.posts.map((p: PostType, index: number) => (
            <div key={index} className="bg-gray-300 rounded-lg p-4 mb-4 transition duration-500 hover:bg-gray-400">
              <Link href={`/post/${p.uuid}`}>
                <p className="text-lg font-semibold">{p.title}</p>
                <p className="text-gray-600">{p.content}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">TODOがありません</p>
        )}
      </div>
    </main >
  );
};

export default PostList;