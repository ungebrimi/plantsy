import {getServerSession} from "@/app/supabase-server";

export const dynamic = "force-dynamic"
import React from "react";
import Navbar from "./Navbar";

async function ServerNav() {

    const {session, supabase, error } = await getServerSession()

    if (!session) {
        return (
            <header>
                <Navbar client={null} professional={null}  session={session}/>
            </header>
        );
    }
    if(session) {
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
            if(professional.profile_picture) {
                professional.profile_picture = JSON.parse(professional.profile_picture)
            }
            return (
                <header>
                    <Navbar client={null} professional={professional} session={session}/>
                </header>
            )
        }

        if(client) {
            if(client.profile_picture) {
                client.profile_picture = JSON.parse(client.profile_picture)
            }
            return (
                <header>
                    <Navbar client={client} professional={null} session={session} />
                </header>
            )
        }

        if(!client && !professional) {
            return (
                <header>
                    <Navbar client={null} professional={null} session={session}/>
                </header>
            )
        }
    }
}

export default ServerNav;
