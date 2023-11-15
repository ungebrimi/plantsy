import React from "react";
import Navbar from "./Navbar";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

async function ServerNav() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) {
    return (
      <header>
        <Navbar
          serverClient={null}
          serverProfessional={null}
          session={session}
        />
      </header>
    );
  }
  if (session) {
    const { data: professional, error: professionalError } = await supabase
      .from("professionals")
      .select()
      .eq("id", session.user.id)
      .single();
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select()
      .eq("id", session.user.id)
      .single();

    if (professional) {
      if (professional.profile_picture) {
        professional.profile_picture = JSON.parse(professional.profile_picture);
      }

      return (
        <header>
          <Navbar
            serverClient={null}
            serverProfessional={professional}
            session={session}
          />
        </header>
      );
    }

    if (client) {
      if (client.profile_picture) {
        client.profile_picture = JSON.parse(client.profile_picture);
      }
      return (
        <header>
          <Navbar
            serverClient={client}
            serverProfessional={null}
            session={session}
          />
        </header>
      );
    }

    if (!client && !professional) {
      return (
        <header>
          <Navbar
            serverClient={null}
            serverProfessional={null}
            session={session}
          />
        </header>
      );
    }
  }
}

export default ServerNav;
