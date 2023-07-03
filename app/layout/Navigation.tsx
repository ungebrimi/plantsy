import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Navbar from './Navbar'

//*
//* THIS COMPONENT HANDLES GETTING THE SESSION SERVER SIDE SO THE RIGHT INFORMATION IS DISPLAYED IN THE NAVBAR 
//* BEFORE THE PAGE LOADS
//*//

export default async function Navigation() {
  const supabase = createServerComponentClient<any>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <Navbar session={session} />
}
