import React from "react";
import Navbar from "./Navbar";
import { getSession } from "../supabase-server";

async function ServerNav() {
  const session = (await getSession()) || null;
  console.log(session);
  return (
    <header>
      <Navbar session={session} />
    </header>
  );
}

export default ServerNav;
