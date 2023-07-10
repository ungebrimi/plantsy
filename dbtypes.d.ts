interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
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
  role: string | null;
  rating: number | null;
}

export { User };
