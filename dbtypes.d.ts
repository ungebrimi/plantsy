interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  company: string | null;
  website: string | null;
  status: string | null;
  profile_picture: any;
  about: string | null;
  zip: string | null;
  city: string | null;
  street: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
  phone: string | null;
  role: string;
  rating: number | null;
  company: string;
  company_role: string | null;
  active: boolean;
}

interface Professional {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  company: string | null;
  website: string | null;
  status: string | null;
  profile_picture: any;
  about: string | null;
  zip: string | null;
  city: string | null;
  street: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
  phone: string | null;
  role: string;
  rating: number | null;
  company: string;
  company_role: string | null;
  active: boolean;
  email_notification_jobs: boolean;
  email_notification_messages: boolean;
  sms_notification_jobs: boolean;
  sms_notification_messages: boolean;
}

interface MessageType {
  id: number;
  inserted_at: string;
  channel_id: number;
  message: string | null;
  client_id: string;
  professional_id: string;
  files: string[];
  images: string[];
}

interface FileType {
  id: number;
  created_at: string;
  owner: string;
  type: string;
  size: number;
  name: string;
  url: string;
}

interface ServiceType {
  title: string;
  thumbnail: JSON | null;
  images: JSON | [];
  price: number;
  vat: number;
  city: string;
  state: string;
  county: string;
  zip: string;
  service_category: string | null;
  keywords: string[];
  description: string;
}

interface ServiceCategoryType {
  created_at: string;
  id: number;
  name: string;
  value: string;
  checked: boolean;
}

interface CityType {
  city: string;
  city_ascii: string;
  state_id: string;
  state_name: string;
  county_fips: number;
  county_name: string;
  lat: number;
  lng: number;
  population: number;
  density: number;
  source: string;
  military: boolean;
  incorperated: boolean;
  timezone: string;
  ranking: number;
  zipz: text;
  id: number;
}

export {
  MessageType,
  Client,
  Professional,
  FileType,
  ServiceType,
  ServiceCategoryType,
  CityType,
};
