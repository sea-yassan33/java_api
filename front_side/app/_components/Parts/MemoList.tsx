"use client"
import { useState, useEffect } from "react"
import type { Memo } from "@/type"
import config from "@/config/propaties";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ja } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import EditMemoDialog from "@/app/_components/Parts/EditMemoDialog"

export default function MemoList() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [memoToEdit, setMemoToEdit] = useState<Memo | null>(null)

  // メモ情報取得
  const fetchMemos = async () => {
    try {
      const response = await fetch(`${config.api02All}`);
      if (!response.ok) {
        throw new Error("Failed to fetch memos");
      }
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error("Error fetching memos:", error);
    }
  };
  useEffect(() => {
    fetchMemos();
  }, []);

    // 編集ダイアログを開く
  const openEditDialog = (memo: Memo) => {
    setMemoToEdit(memo)
  }

    // 編集ダイアログを閉じる
  const closeEditDialog = () => {
    setMemoToEdit(null)
  }

  //　メモを更新する
  const updateMemo = async (memo: Memo) => {
    try {
      const response = await fetch(`${config.api02update}${memo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memo),
      });
      if (!response.ok) {
        throw new Error("Failed to update memo");
      }
      // メモを更新
      closeEditDialog();
      console.log("メモが更新されました。");
      setTimeout(() => {
        window.location.href = '/api02';
      }, 1000);
    } catch (error) {
      console.error("Error updating memo:", error);
      setTimeout(() => {
        window.location.href = '/404';
      }, 1000);
    }
  }

  return (
    <div>
      {memos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">メモがありません。新しいメモを作成してください。</p>
        </div>
      ):(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memos.map((memo) => (
          <Card key={memo.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{memo.name}</CardTitle>
              <CardDescription>
                {memo.update_date ? formatDistanceToNow(new Date(memo.update_date), { addSuffix: true, locale: ja }) : "更新日不明"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{memo.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="icon" onClick={() => openEditDialog(memo)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only" onClick={() => openEditDialog(memo)}>編集</span>
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">削除</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div> 
      )}
      {memoToEdit && <EditMemoDialog memo={memoToEdit} onSave={updateMemo} onCancel={closeEditDialog} />}
    </div> 
  );
}