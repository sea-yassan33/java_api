"use client";
import { StockPrice } from "@/type";
import { useState } from "react";
import { format } from "date-fns";
import {Area, AreaChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, LineChart, ComposedChart} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// 型定義
interface StockChartProps {
  data: StockPrice[];
  title?: string;
}
// main
export default function StockChart({ data, title = "Stock Price Chart" }: StockChartProps){
  const [activeTab, setActiveTab] = useState("line");
  // 日付と通貨のフォーマット関数
  const formattedData = data.map((item) => ({
    ...item,
    date: format(new Date(item.date), "MMM dd"),
    formattedDate: format(new Date(item.date), "MMMM dd, yyyy"),
  }));
  // 通貨のフォーマット関数
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };
  // ツールチップのカスタムコンポーネント
  // active: ツールチップがアクティブかどうかを示すフラグ
  // payload: ツールチップに表示するデータ
  // active と payload が存在する場合にツールチップを表示
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { formattedDate: string; open: number; high: number; low: number; close: number } }[] }) => {
    // active が true で payload が存在する場合にツールチップを表示
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-4 rounded-md shadow-lg">
          <p className="font-semibold">{payload[0]?.payload.formattedDate}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            <p className="text-sm">Open:</p>
            <p className="text-sm font-medium text-right">{formatCurrency(payload[0]?.payload.open)}</p>
            <p className="text-sm">High:</p>
            <p className="text-sm font-medium text-right">{formatCurrency(payload[0]?.payload.high)}</p>
            <p className="text-sm">Low:</p>
            <p className="text-sm font-medium text-right">{formatCurrency(payload[0]?.payload.low)}</p>
            <p className="text-sm">Close:</p>
            <p className="text-sm font-medium text-right">{formatCurrency(payload[0]?.payload.close)}</p>
          </div>
        </div>
      );
    }
    return null;
  };
  // return
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Stock price trends over time showing open, high, low, and close values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="ohlc">OHLC</TabsTrigger>
            </TabsList>
          </div>
          {/* lineの内容を表示 */}
          <TabsContent value="line" className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[(dataMin: number) => dataMin * 0.99, (dataMax: number) => dataMax * 1.01]}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="open"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          {/* areaの内容を表示する*/}        
          <TabsContent value="area" className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[(dataMin: number) => dataMin * 0.99, (dataMax: number) => dataMax * 1.01]}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={0.3}
                  fill="hsl(var(--chart-2))"
                />
                <Area
                  type="monotone"
                  dataKey="open"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={0.3}
                  fill="hsl(var(--chart-1))"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          {/* ohlcの内容を表示する*/}
          <TabsContent value="ohlc" className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[(dataMin: number) => dataMin * 0.99, (dataMax: number) => dataMax * 1.01]}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="open"
                  fill="hsl(var(--chart-1))"
                  stroke="hsl(var(--chart-1))"
                  barSize={2}
                />
                <Bar
                  dataKey="close"
                  fill="hsl(var(--chart-2))"
                  stroke="hsl(var(--chart-2))"
                  barSize={2}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke="hsl(var(--chart-4))"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  stroke="hsl(var(--chart-5))"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}