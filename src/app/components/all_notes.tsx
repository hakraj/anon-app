'use client'

import Note from "./note";
import { useEffect, useState } from 'react';


const AllNote = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the latest posts data from the server
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data.data);
        };

        // Fetch the initial posts data
        fetchData();

        // Fetch the latest posts data every 10 seconds
        const interval = setInterval(fetchData, 4000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);


    return (
        <Note posts={posts} />
    )
}

export default AllNote;

