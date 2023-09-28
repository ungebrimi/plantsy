import React from "react";
import Navbar from "./Navbar";
import { getSession } from "../supabase-server";

async function ServerNav() {
  const session = (await getSession()) || null;
  return (
    <header>
      <Navbar session={session} />
      <h1>hello</h1>
    </header>
  );
}

export default ServerNav;
