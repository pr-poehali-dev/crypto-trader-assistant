import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Отсутствуют переменные окружения для Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типы для базы данных
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
        };
      };
      watchlists: {
        Row: {
          id: string;
          user_id: string;
          coin_id: string;
          coin_name: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          coin_id: string;
          coin_name: string;
        };
      };
      trades: {
        Row: {
          id: string;
          user_id: string;
          coin_id: string;
          type: "buy" | "sell";
          amount: number;
          price: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          coin_id: string;
          type: "buy" | "sell";
          amount: number;
          price: number;
        };
      };
    };
  };
}
