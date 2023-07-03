'use client'

import DelButton from "../components/del_button";
import Link from "next/link";
import { useState, useEffect } from 'react';

const IdPost = ({ params }: { params: { id: string } }) => {

    const [post, setPost] = useState({ _id: "", title: "", content: "" });

    const { title, content } = post


    useEffect(() => {
        const fetchData = async () => {
            // Fetch the latest posts data from the server
            const response = await fetch(`/api/posts/${params.id}`);
            const data = await response.json();
            setPost(data.data);
        };

        // Fetch the initial posts data
        fetchData();

        // Fetch the latest posts data every 10 seconds
        const interval = setInterval(fetchData, 10000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [params.id]);

    return (
        <main>
            <div className="container flex justify-center items-center">
                <div className="w-11/12 sm:w-3/4 p-4 sm:p-8">

                    <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f5ba13]">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <div className='flex items-center justify-between m-1 mt-8'>
                        <h1 className="text-2xl">{title}</h1>
                        <div className='flex items-center justify-around w-20' >
                            <Link href={`/${params.id}/edit`} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f5ba13]">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </Link>
                            <DelButton _id={params.id} />
                        </div>
                    </div>

                    <hr className="mb-8 border-slate-300" />

                    <div>
                        <p>{content}</p>
                    </div>


                </div>
            </div>
        </main>

    )
}

export default IdPost;