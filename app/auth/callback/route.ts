import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const supabase = createRouteHandlerClient<any>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (next && code) {
    console.log(next);
    return NextResponse.redirect(next);
  } else if (code) {
    console.log(requestUrl.origin);
    return NextResponse.redirect(requestUrl.origin);
  }
}
