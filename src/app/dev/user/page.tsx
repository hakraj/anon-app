'use client'

import Intro from "../../components/main/intro";
import CreateArea from "../../components/main/create_area";
import Account from "../../components/main/account";
import Note from "@/app/components/main/note";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


const Profile = () => {
  const { data: session, status } = useSession()
  const [notes, setNotes] = useState([]);

  const img = session?.user?.image as string;
  const name = session?.user?.name

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the user posts data from the server
      if (status === "authenticated") {
        const response = await fetch(`/api/posts/user?email=${session?.user?.email}`);
        const data = await response.json();

        setNotes(data.data);
      }
    };

    // Fetch the initial posts data
    fetchData();

    // Fetch the latest posts data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [session, status]);

  return (
    <main>
      <Intro text={`Hey ${name} !`} />
      <Account img={img} notes={notes} />
      <CreateArea />
      <Note notes={notes} />
    </main>
  )
}

export default Profile
