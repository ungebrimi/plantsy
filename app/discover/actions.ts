"use server";
import { revalidatePath } from "next/cache";

export const fetchDiscover = () => async (formData: FormData) => {
  "use server";
  const categories = formData.getAll("categories");
  console.log(categories);
  if (categories.length === 0) {
    const params = new URLSearchParams([
      ["categories[]", categories.join(",")],
    ]);

    revalidatePath(`/discover?${params}`);
  }
};
