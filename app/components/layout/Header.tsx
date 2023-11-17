import React from "react";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import Banner from "@/app/components/layout/Banner";
import Navigation from "@/app/components/layout/Navigation";

async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (!session) {
    return (
      <header>
        <Banner />
        <Navigation
          serverClient={null}
          serverProfessional={null}
          userType={null}
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
          <Navigation
            serverClient={null}
            serverProfessional={professional}
            userType={"professional"}
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
          <Banner />
          <Navigation
            serverClient={client}
            serverProfessional={null}
            userType={"client"}
          />
        </header>
      );
    }

    if (!client && !professional) {
      return (
        <header>
          <Banner />
          <Navigation
            serverClient={null}
            serverProfessional={null}
            userType={null}
          />
        </header>
      );
    }
  }
}

export default Header;
