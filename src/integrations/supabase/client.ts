
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = 'https://txqvmvvbbykoyfbkdasd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cXZtdnZiYnlrb3lmYmtkYXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTcxMTAsImV4cCI6MjA1NTM3MzExMH0.TOKNj8zDZ38uPODUtLk9xQOVJ54FaQxg0z8E0i-KBHE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
