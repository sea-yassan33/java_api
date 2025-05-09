export interface StockPrice {
    id: number;
    date: string;
    open: number;
    high: number;
    close: number;
    low: number;
  }

export interface Memo {
  id?: number
  name: string
  content: string
  create_date?: string
  update_date?: string
  delet_flag?: number
} 