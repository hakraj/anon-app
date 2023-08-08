'use client'

import Note from "./note";
import { useEffect, useState } from 'react';
import { getData } from "../../../../utils/service";


const AllNote = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setNotes(res)
    }

    // Fetch the initial posts data
    fetchData();

    // Fetch the latest posts data every 10 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <Note notes={notes} />
  )
}

export default AllNote;

