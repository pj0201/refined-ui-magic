
import { createClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      secrets: {
        Row: {
          id: string
          name: string
          secret: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          secret: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          secret?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

const SUPABASE_URL = "https://txqvmvvbbykoyfbkdasd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cXZtdnZiYnlrb3lmYmtkYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTcxMTAsImV4cCI6MjA1NTM3MzExMH0.TOKNj8zDZ38uPODUtLk9xQOVJ54FaQxg0z8E0i-KBHE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
