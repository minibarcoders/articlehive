import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://xvpczdnbympjidnmwzxz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cGN6ZG5ieW1wamlkbm13enh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1OTA1MjAsImV4cCI6MjA1MDE2NjUyMH0.qn49-AL8VE0uKV5OXSZ0EsqrVFQV7LzsDdO4dW9Y0t8";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);