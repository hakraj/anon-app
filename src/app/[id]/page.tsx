'use client'

import Back from "@mui/icons-material/ChevronLeft";
import EditIcon from '@mui/icons-material/Edit';
import DelButton from "../components/del_button";
import Link from "next/link";
import { useState, useEffect } from 'react';

const IdPost = ({ params }: { params: { id: string } }) => {

    const [post, setPost] = useState({ _id: "", title: "", content: "" });


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
                        <Back className="text-[#f5ba13] text-5xl mb-8 relative right-2 " />
                    </Link>

                    <div className='flex items-center justify-between m-1'>
                        <h1 className="text-2xl">{post.title}</h1>
                        <div className='flex items-center justify-around w-20' >
                            <Link href={`/${params.id}/edit`} > <EditIcon className='text-[#f5ba13]' /> </Link>
                            <DelButton _id={params.id} />
                        </div>
                    </div>

                    <hr className="mb-8 border-slate-300" />

                    <div>
                        <p>{post.content}</p>
                    </div>


                </div>
            </div>
        </main>

    )
}

export default IdPost;