'use client'

import Intro from "../../components/main/intro";
import CreateArea from "../../components/main/create_area";
import Account from "../../components/main/account";
import Note from "@/app/components/main/note";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getUser } from "../../../../utils/user";


const Profile = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email as string;

  const [currentUser, setCurrentUser] = useState("");


  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (session?.user?.name) {
      setCurrentUser(session?.user?.name as string)
    } else {
      // Fetch the current user 
      const fetchUser = async () => {
        const res = await getUser({ email: userEmail })
        setCurrentUser(res.data.name)
      }
      fetchUser();
    }

    const fetchData = async () => {
      // Fetch the user posts data from the server
      if (status === "authenticated") {
        const response = await fetch(`/api/posts/user?email=${userEmail}`);
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
  }, [session, status, userEmail]);

  return (
    <main>
      <Intro text={`Hey ${currentUser} !`} />
      <Account notes={notes} />
      <CreateArea />
      <Note notes={notes} />
    </main>
  )
}

export default Profile
