export const dynamic = "force-dynamic"
import React from "react";
import Navbar from "./Navbar";
import { getSession } from "../supabase-server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";

async function ServerNav() {
    const session = await getSession()
    const supabase = createServerComponentClient({cookies});

    if (!session) {
        return (
            <header>
                <Navbar client={null} professional={null} />
            </header>
        );
    }

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

    if (professional && professional.profile_picture) {
        professional.profile_picture = JSON.parse(professional.profile_picture)
        return (
            <header>
                <Navbar client={null} professional={professional} />
            </header>
        )
    }

    if(client && client.profile_picture) {
        client.profile_picture = JSON.parse(client.profile_picture)
        return (
            <header>
                     <Navbar client={client} professional={null} />
            </header>
        )
    }
}

export default ServerNav;
