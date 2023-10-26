import { Tables } from "@/database";

const mockDefaultServiceForm: Tables<"services"> = {
  city: "",
  county: "",
  created_at: null,
  description: "",
  id: 0,
  images: null,
  keywords: [],
  price: 0,
  professional_id: "",
  service_category: "",
  state: "",
  thumbnail: null,
  title: "",
  vat: 0,
  vat_included: false,
  zip: "",
};

export default mockDefaultServiceForm;
