import { Tables } from "@/database";

const mockProfessional: Tables<"professionals"> = {
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  active: true,
  city: "New York",
  company: "Example Company",
  company_role: "CEO",
  country: "USA",
  county: "Example County",
  email: "example@example.com",
  email_notification_jobs: true,
  email_notification_messages: true,
  first_name: "John",
  id: "d08fcf2f-e49c-4e4a-a802-b021136dd370",
  last_name: "Doe",
  phone: "123-456-7890",
  profile_picture: {
    // JSON structure for the profile picture, modify as needed
    id: 79,
    created_at: "2023-09-28T12:14:27.404916+00:00",
    name: "profile1.png",
    url: "https://dhxummckajoranathmmy.supabase.co/storage/v1/object/public/professionals/d08fcf2f-e49c-4e4a-a802-b021136dd370/avatars/profile1.png",
    owner: "d08fcf2f-e49c-4e4a-a802-b021136dd370",
    type: "image/png",
  },
  rating: 4.5,
  role: "Professional",
  sms_notification_jobs: true,
  sms_notification_messages: true,
  state: "New York",
  street: "123 Main St",
  username: "johndoe",
  website: "https://example.com",
  zip: "10001",
};

export default mockProfessional;
