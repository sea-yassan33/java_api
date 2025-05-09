import type { Metadata } from "next";
import MemoList from "@/app/_components/Parts/MemoList";
import CreateMemo from "../_components/Parts/CreateMemo";

export const metadata: Metadata = {
  title: "シンプルメモ帳",
  description: "シンプルなメモ帳アプリ",
}

export default function Api02() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">メモ帳</h1>
        <CreateMemo />
      </div>
      <MemoList />
    </main>
  );
}