import { Tables } from "@/database";

const mockDefaultServiceForm: Tables<"services"> = {
  city: "",
  county: null,
  created_at: null,
  description: "",
  id: 0,
  images: null,
  keywords: [],
  price: 0,
  professional_id: "",
  service_category: "",
  state: null,
  thumbnail: null,
  title: "",
  vat: null,
  vat_included: false,
  zip: null,
};

export default mockDefaultServiceForm;
