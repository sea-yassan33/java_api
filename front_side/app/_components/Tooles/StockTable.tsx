"use client";
import { StockPrice } from "@/type";
import { useState } from "react";
import { format } from "date-fns";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// 型定義
interface StockTableProps {
    data: StockPrice[];
  }
type SortKey = "date" | "open" | "high" | "low" | "close";
type SortOrder = "asc" | "desc";
// main
export default function StockTable({ data }: StockTableProps){
    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    // ソートの状態を管理するための関数
    // sortKey: ソートするキー（date, open, high, low, close）
    const sortedData = [...data].sort((a, b) => {
      if (sortKey === "date") {
        const dateA = new Date(a[sortKey]);
        const dateB = new Date(b[sortKey]);
        return sortOrder === "asc" 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      return sortOrder === "asc" 
        ? a[sortKey] - b[sortKey] 
        : b[sortKey] - a[sortKey];
    });
    // ソートの状態を管理するための関数
    const toggleSort = (key: SortKey) => {
      if (key === sortKey) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    };
    // ソートボタンのコンポーネント
    // toggleSort 関数を呼び出すことで、ソートの状態を変更します
    const SortButton = ({ column }: { column: SortKey }) => (
        <Button variant="ghost" size="sm" className="ml-1 h-7 p-0" onClick={() => toggleSort(column)}>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    // 日付と通貨のフォーマット関数
    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), "MMM dd, yyyy");
      } catch {
        return dateString;
      }
    };
    // 通貨のフォーマット関数
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(value);
    };
    // returen
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">
                Date <SortButton column="date" />
              </TableHead>
              <TableHead className="text-right font-semibold">
                Open <SortButton column="open" />
              </TableHead>
              <TableHead className="text-right font-semibold">
                High <SortButton column="high" />
              </TableHead>
              <TableHead className="text-right font-semibold">
                Low <SortButton column="low" />
              </TableHead>
              <TableHead className="text-right font-semibold">
                Close <SortButton column="close" />
              </TableHead>
              <TableHead className="text-right font-semibold">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => {
                //　Cangeの計算
                const change = row.close - row.open;
                const changePercent = (change / row.open) * 100;
                const isPositive = change >= 0;
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                        {formatDate(row.date)}
                    </TableCell>
                    <TableCell className="text-right">
                        {formatCurrency(row.open)}
                    </TableCell>
                    <TableCell className="text-right">
                        {formatCurrency(row.high)}
                    </TableCell>
                    <TableCell className="text-right">
                        {formatCurrency(row.low)}
                    </TableCell>
                    <TableCell className="text-right">
                        {formatCurrency(row.close)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                        {isPositive ? "+" : ""}
                            {formatCurrency(change)} ({isPositive ? "+" : ""}
                        {changePercent.toFixed(2)}%)
                    </TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </div>
    );
}