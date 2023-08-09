interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  company: string | null;
  website: string | null;
  status: string | null;
  profile_picture: string | null;
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

export { User };
