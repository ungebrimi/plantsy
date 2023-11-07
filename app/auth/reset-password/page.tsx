import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const resetPassword = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return redirect(
        `/auth/reset-password?message=Error resetting password: ${error.message}`,
      );
    }
    return redirect(
      "/auth/reset-password?message=Password reset email sent. Please check your inbox./",
    );
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            width={300}
            height={300}
            className="mx-auto h-10 w-auto"
            src="/plantsy.png"
            alt="Plantsy"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <p>{searchParams.message && searchParams.message}</p>
            <form className="space-y-6" action={resetPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex mt-8 w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
