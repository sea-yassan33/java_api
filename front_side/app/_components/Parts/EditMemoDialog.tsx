"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Memo } from "@/type"

interface EditMemoDialogProps {
  memo: Memo
  onSave: (memo: Memo) => void
  onCancel: () => void
}

export default function EditMemoDialog({ memo, onSave, onCancel }: EditMemoDialogProps) {
  const [name, setName] = useState(memo.name)
  const [content, setContent] = useState(memo.content)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setName(memo.name)
    setContent(memo.content)
  }, [memo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    const updatedMemo: Memo = {
      ...memo,
      name: name.trim(),
      content: content.trim(),
    }

    onSave(updatedMemo)
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      onCancel()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>メモを編集</DialogTitle>
            <DialogDescription>メモのタイトルと内容を編集してください。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                タイトル
              </label>
              <Input
                id="edit-title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="メモのタイトル"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-content" className="text-sm font-medium">
                内容
              </label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="メモの内容"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}