import { createClient } from "@supabase/supabase-js";

// These would normally come from environment variables
// For now, using placeholder values - you'll need to replace with your actual Supabase project credentials
const supabaseUrl = "https://tfstomfqybhxcdgledvs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmc3RvbWZxeWJoeGNkZ2xlZHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg5MzksImV4cCI6MjA2NzcxNDkzOX0.gti5DjtvJyEQIjy1BGmr-qHW3UjRVe5bSO7sIZLf8i4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          name: string;
          email: string;
          mobile: string;
          college: string;
          batch: string;
          gender: "male" | "female";
          clothing_type: "shirt" | "pant" | "shoes";
          age: number;
          height: number;
          weight: number;
          morphology: string;
          fit_preference: string;
          collar_size?: string;
          chest?: number;
          waist?: number;
          hip?: number;
          shoulder?: number;
          inseam?: number;
          shoe_size?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          email: string;
          mobile: string;
          college: string;
          batch: string;
          gender: "male" | "female";
          clothing_type: "shirt" | "pant" | "shoes";
          age: number;
          height: number;
          weight: number;
          morphology: string;
          fit_preference: string;
          collar_size?: string;
          chest?: number;
          waist?: number;
          hip?: number;
          shoulder?: number;
          inseam?: number;
          shoe_size?: number;
        };
        Update: {
          name?: string;
          email?: string;
          mobile?: string;
          college?: string;
          batch?: string;
          gender?: "male" | "female";
          clothing_type?: "shirt" | "pant" | "shoes";
          age?: number;
          height?: number;
          weight?: number;
          morphology?: string;
          fit_preference?: string;
          collar_size?: string;
          chest?: number;
          waist?: number;
          hip?: number;
          shoulder?: number;
          inseam?: number;
          shoe_size?: number;
        };
      };
    };
  };
};
