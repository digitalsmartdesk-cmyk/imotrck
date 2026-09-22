export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          country: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          phone?: string | null
          country?: string | null
          updated_at?: string | null
        }
        Update: {
          name?: string | null
          email?: string | null
          phone?: string | null
          country?: string | null
          updated_at?: string | null
        }
      }
      children: {
        Row: {
          id: string
          parent_id: string
          name: string
          date_of_birth: string | null
          age: number | null
          relationship: string | null
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          date_of_birth?: string | null
          age?: number | null
          relationship?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          date_of_birth?: string | null
          age?: number | null
          relationship?: string | null
        }
      }
      credits: {
        Row: {
          id: string
          parent_id: string
          balance: number
        }
        Insert: {
          id?: string
          parent_id: string
          balance?: number
        }
        Update: {
          balance?: number
        }
      }
      test_sessions: {
        Row: {
          id: string
          child_id: string
          parent_id: string
          topic: string
          is_free: boolean
          status: string
          answers: Json | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          parent_id: string
          topic: string
          is_free?: boolean
          status?: string
          answers?: Json | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          status?: string
          answers?: Json | null
          completed_at?: string | null
        }
      }
      reports: {
        Row: {
          id: string
          session_id: string
          child_id: string
          parent_id: string
          topic: string
          scores: Json | null
          insights: Json | null
          overall_label: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          child_id: string
          parent_id: string
          topic: string
          scores?: Json | null
          insights?: Json | null
          overall_label?: string | null
          created_at?: string
        }
        Update: {
          scores?: Json | null
          insights?: Json | null
          overall_label?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          parent_id: string
          plan: string
          amount: number
          credits_added: number
          upi_ref: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          plan: string
          amount: number
          credits_added: number
          upi_ref?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          status?: string
        }
      }
    }
  }
}
