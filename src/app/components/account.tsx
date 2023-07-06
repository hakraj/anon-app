'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

const Account = () => {
    const [posts, setPosts] = useState([{ likes: 0, comments: [] }]);

    const anonScore = posts.reduce((prev, current) => {
        return { likes: (prev.likes + current.likes), comments: [...prev.comments, ...current.comments] }
    })

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
        const interval = setInterval(fetchData, 10000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-start items-center w-11/12 my-8 mx-auto lg:w-1/2 ">
            <div className="ml-[5%] mr-auto">
                <Image
                    className="rounded-full shadow-md outline-none"
                    src="/images/anon-avatar.png"
                    alt="avatar-img"
                    width={102}
                    height={102}
                />
            </div>

            <div className="text-center px-[5%] " >
                <h1 className="text-4xl sm:text-6xl">{posts.length}</h1>
                <p className="text-xs sm:text-base">notes</p>
            </div>
            <div className="text-center px-[5%] ">
                <h1 className="text-4xl sm:text-6xl">{(anonScore.likes + anonScore.comments.length) * 10}</h1>
                <p className="text-xs sm:text-base">anonscore</p>
            </div>

        </div>
    )
}

export default Account;