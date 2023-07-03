interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  zip: string | null;
  city: string | null;
  street: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
  phone: string | null;
  role: string | null;
  rating: number | null;
  profile_image: string | null;
}

export { User };
