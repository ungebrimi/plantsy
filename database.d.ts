export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      channels: {
        Row: {
          client_id: string;
          client_name: string | null;
          client_profile_picture: Json | null;
          id: number;
          inserted_at: string;
          professional_id: string | null;
          professional_name: string | null;
          professional_profile_picture: Json | null;
        };
        Insert: {
          client_id: string;
          client_name?: string | null;
          client_profile_picture?: string | null;
          id?: number;
          inserted_at?: string;
          professional_id?: string | null;
          professional_name?: string | null;
          professional_profile_picture?: Json | null;
        };
        Update: {
          client_id?: string;
          client_name?: string | null;
          client_profile_picture?: string | null;
          id?: number;
          inserted_at?: string;
          professional_id?: string | null;
          professional_name?: string | null;
          professional_profile_picture?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "channels_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "channels_professional_id_fkey";
            columns: ["professional_id"];
            referencedRelation: "professionals";
            referencedColumns: ["id"];
          },
        ];
      };
      cities: {
        Row: {
          city: string | null;
          city_ascii: string | null;
          county_fips: number | null;
          county_name: string | null;
          density: number | null;
          id: number | null;
          incorporated: boolean | null;
          lat: number | null;
          lng: number | null;
          military: boolean | null;
          population: number | null;
          ranking: number | null;
          source: string | null;
          state_id: string | null;
          state_name: string | null;
          timezone: string | null;
          zips: string | null;
        };
        Insert: {
          city?: string | null;
          city_ascii?: string | null;
          county_fips?: number | null;
          county_name?: string | null;
          density?: number | null;
          id?: number | null;
          incorporated?: boolean | null;
          lat?: number | null;
          lng?: number | null;
          military?: boolean | null;
          population?: number | null;
          ranking?: number | null;
          source?: string | null;
          state_id?: string | null;
          state_name?: string | null;
          timezone?: string | null;
          zips?: string | null;
        };
        Update: {
          city?: string | null;
          city_ascii?: string | null;
          county_fips?: number | null;
          county_name?: string | null;
          density?: number | null;
          id?: number | null;
          incorporated?: boolean | null;
          lat?: number | null;
          lng?: number | null;
          military?: boolean | null;
          population?: number | null;
          ranking?: number | null;
          source?: string | null;
          state_id?: string | null;
          state_name?: string | null;
          timezone?: string | null;
          zips?: string | null;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          about: string | null;
          city: string | null;
          company: string | null;
          country: string | null;
          county: string | null;
          email: string | null;
          email_notification_jobs: boolean;
          email_notification_messages: boolean;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          profile_picture: Json | null;
          rating: number | null;
          role: string | null;
          sms_notification_jobs: boolean;
          sms_notification_messages: boolean;
          state: string | null;
          status: Database["public"]["Enums"]["user_status"] | null;
          street: string | null;
          username: string | null;
          website: string | null;
          zip: string | null;
        };
        Insert: {
          about?: string | null;
          city?: string | null;
          company?: string | null;
          country?: string | null;
          county?: string | null;
          email?: string | null;
          email_notification_jobs?: boolean;
          email_notification_messages?: boolean;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture?: Json | null;
          rating?: number | null;
          role?: string | null;
          sms_notification_jobs?: boolean;
          sms_notification_messages?: boolean;
          state?: string | null;
          status?: Database["public"]["Enums"]["user_status"] | null;
          street?: string | null;
          username?: string | null;
          website?: string | null;
          zip?: string | null;
        };
        Update: {
          about?: string | null;
          city?: string | null;
          company?: string | null;
          country?: string | null;
          county?: string | null;
          email?: string | null;
          email_notification_jobs?: boolean;
          email_notification_messages?: boolean;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture?: Json | null;
          rating?: number | null;
          role?: string | null;
          sms_notification_jobs?: boolean;
          sms_notification_messages?: boolean;
          state?: string | null;
          status?: Database["public"]["Enums"]["user_status"] | null;
          street?: string | null;
          username?: string | null;
          website?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clients_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      counties: {
        Row: {
          county: string | null;
          county_ascii: string | null;
          county_fips: number | null;
          county_full: string | null;
          lat: number | null;
          lng: number | null;
          population: number | null;
          state_id: string | null;
          state_name: string | null;
        };
        Insert: {
          county?: string | null;
          county_ascii?: string | null;
          county_fips?: number | null;
          county_full?: string | null;
          lat?: number | null;
          lng?: number | null;
          population?: number | null;
          state_id?: string | null;
          state_name?: string | null;
        };
        Update: {
          county?: string | null;
          county_ascii?: string | null;
          county_fips?: number | null;
          county_full?: string | null;
          lat?: number | null;
          lng?: number | null;
          population?: number | null;
          state_id?: string | null;
          state_name?: string | null;
        };
        Relationships: [];
      };
      files: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          owner: string | null;
          size: number | null;
          type: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: string | null;
          size?: number | null;
          type?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: string | null;
          size?: number | null;
          type?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          channel_id: number;
          client_id: string | null;
          files: string[] | null;
          id: number;
          images: string[] | null;
          inserted_at: string;
          message: string | null;
          professional_id: string | null;
        };
        Insert: {
          channel_id: number;
          client_id?: string | null;
          files?: string[] | null;
          id?: number;
          images?: string[] | null;
          inserted_at?: string;
          message?: string | null;
          professional_id?: string | null;
        };
        Update: {
          channel_id?: number;
          client_id?: string | null;
          files?: string[] | null;
          id?: number;
          images?: string[] | null;
          inserted_at?: string;
          message?: string | null;
          professional_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey";
            columns: ["channel_id"];
            referencedRelation: "channels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_client_id_fkey";
            columns: ["client_id"];
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_professional_id_fkey";
            columns: ["professional_id"];
            referencedRelation: "professionals";
            referencedColumns: ["id"];
          },
        ];
      };
      neighborhoods: {
        Row: {
          city_id: number | null;
          city_name: string | null;
          county_fips: number | null;
          county_name: string | null;
          id: number | null;
          lat: number | null;
          lng: number | null;
          neighborhood: string | null;
          neighborhood_ascii: string | null;
          source: string | null;
          state_id: string | null;
          state_name: string | null;
          timezone: string | null;
          zips: string | null;
        };
        Insert: {
          city_id?: number | null;
          city_name?: string | null;
          county_fips?: number | null;
          county_name?: string | null;
          id?: number | null;
          lat?: number | null;
          lng?: number | null;
          neighborhood?: string | null;
          neighborhood_ascii?: string | null;
          source?: string | null;
          state_id?: string | null;
          state_name?: string | null;
          timezone?: string | null;
          zips?: string | null;
        };
        Update: {
          city_id?: number | null;
          city_name?: string | null;
          county_fips?: number | null;
          county_name?: string | null;
          id?: number | null;
          lat?: number | null;
          lng?: number | null;
          neighborhood?: string | null;
          neighborhood_ascii?: string | null;
          source?: string | null;
          state_id?: string | null;
          state_name?: string | null;
          timezone?: string | null;
          zips?: string | null;
        };
        Relationships: [];
      };
      professionals: {
        Row: {
          about: string | null;
          active: boolean;
          city: string | null;
          company: string | null;
          company_role: string | null;
          country: string | null;
          county: string | null;
          email: string | null;
          email_notification_jobs: boolean;
          email_notification_messages: boolean;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone: string | null;
          profile_picture: Json | null;
          rating: number | null;
          role: string | null;
          sms_notification_jobs: boolean;
          sms_notification_messages: boolean;
          state: string | null;
          street: string | null;
          username: string | null;
          website: string | null;
          zip: string | null;
        };
        Insert: {
          about?: string | null;
          active?: boolean;
          city?: string | null;
          company?: string | null;
          company_role?: string | null;
          country?: string | null;
          county?: string | null;
          email?: string | null;
          email_notification_jobs?: boolean;
          email_notification_messages?: boolean;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture?: Json | null;
          rating?: number | null;
          role?: string | null;
          sms_notification_jobs?: boolean;
          sms_notification_messages?: boolean;
          state?: string | null;
          street?: string | null;
          username?: string | null;
          website?: string | null;
          zip?: string | null;
        };
        Update: {
          about?: string | null;
          active?: boolean;
          city?: string | null;
          company?: string | null;
          company_role?: string | null;
          country?: string | null;
          county?: string | null;
          email?: string | null;
          email_notification_jobs?: boolean;
          email_notification_messages?: boolean;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone?: string | null;
          profile_picture?: Json | null;
          rating?: number | null;
          role?: string | null;
          sms_notification_jobs?: boolean;
          sms_notification_messages?: boolean;
          state?: string | null;
          street?: string | null;
          username?: string | null;
          website?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professionals_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      service_categories: {
        Row: {
          checked: boolean;
          created_at: string | null;
          id: number;
          name: string | null;
          value: string | null;
        };
        Insert: {
          checked?: boolean;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          value?: string | null;
        };
        Update: {
          checked?: boolean;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          value?: string | null;
        };
        Relationships: [];
      };
      services: {
        Row: {
          city: string;
          county: string | null;
          created_at: string | null;
          description: string;
          id: number;
          images: Json | null;
          keywords: string[] | null;
          price: number;
          professional_id: string | null;
          service_category: string;
          state: string | null;
          thumbnail: Json | null;
          title: string;
          vat: number | null;
          vat_included: boolean;
          zip: string | null;
        };
        Insert: {
          city: string;
          county?: string | null;
          created_at?: string | null;
          description: string;
          id?: never;
          images?: Json | null;
          keywords?: string[] | null;
          price: number;
          professional_id?: string | null;
          service_category: string;
          state?: string | null;
          thumbnail?: Json | null;
          title: string;
          vat?: number | null;
          vat_included?: boolean;
          zip?: string | null;
        };
        Update: {
          city?: string;
          county?: string | null;
          created_at?: string | null;
          description?: string;
          id?: never;
          images?: Json | null;
          keywords?: string[] | null;
          price?: number;
          professional_id?: string | null;
          service_category?: string;
          state?: string | null;
          thumbnail?: Json | null;
          title?: string;
          vat?: number | null;
          vat_included?: boolean;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "services_professional_id_fkey";
            columns: ["professional_id"];
            referencedRelation: "professionals";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_permission: "channels.delete" | "messages.delete";
      app_role: "admin" | "moderator";
      user_status: "ONLINE" | "OFFLINE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
import { PostgrestError } from "@supabase/supabase-js";

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;
