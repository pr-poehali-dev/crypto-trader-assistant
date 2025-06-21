import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://demo.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "demo-key";

// Создаем клиент с demo значениями если переменные не заданы
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Проверяем доступность Supabase
export const isSupabaseConfigured = !!(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
