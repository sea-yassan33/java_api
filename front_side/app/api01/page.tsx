"use client";
import stockData from "@/public/data/stockdata";
import StockTable from "@/app/_components/Tooles/StockTable";
import { tv } from 'tailwind-variants';
import StockChart from "../_components/Tooles/StockChart";

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
  return (
    <div className={twStayles({style:'main01'})}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
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