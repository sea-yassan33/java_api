"use client";
import { StockPrice } from "@/type";
import StockTable from "@/app/_components/Parts/StockTable";
import { tv } from 'tailwind-variants';
import { useEffect, useState } from "react";
import StockChart from "../_components/Parts/StockChart";
import config from "@/config/propaties";
//import stockData from "@/public/data/stockdata";

export default function Api01() {
  const twStayles = tv({
    variants: {
      style:{
        main01:'min-h-screen bg-background p-6 md:p-8 transition-colors duration-300 ease-in-out',
        list01:'bg-card rounded-lg shadow-sm p-6 transition-all duration-300 ease-in-out',
        chart01:'transition-all duration-300 ease-in-out transform hover:shadow-lg rounded-lg',
      },
    },
  });
  // APIから取得したデータを取得
  const [stockData, setStockData] = useState<StockPrice[]>([]);
  const [count,setCount] = useState<number>(10);

  const fetchData = async (dataCount: number) => {
    try {
      const response = await fetch(`${config.sp500api01}?late=${dataCount}`);
      if (!response.ok) {
        throw new Error("API Error: " + response.statusText);
      }
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchData(count);
  }, [count]); 

  return (
    <div className={twStayles({style:'main01'})}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1">
          {/* データ取得数の選択 */}
          <div className="flex items-center mb-4">
            <label htmlFor="dataCount" className="mr-2">データ取得数:</label>
            <select id="dataCount" value={count} onChange={(e) => setCount(Number(e.target.value))} className="border rounded-md p-2">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          {/* 一覧 */}
          <div className={twStayles({style:'list01'})}>
            <h2 className="text-xl font-semibold mb-4">Stock Price Data</h2>
            <div className="overflow-hidden rounded-md">
              <StockTable data={stockData} />
            </div>
          </div>
          {/* チャート図 */}
          <div className={twStayles({style:'chart01'})}>
            <StockChart data={stockData} title="Stock Price Visualization" />
          </div>
        </div>
      </div>
    </div>
  );
}