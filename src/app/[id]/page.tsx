'use client'

import DelButton from "../components/del_button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';

interface Post {
    _id: string,
    title: string,
    content: string,
    likes: number,
    comments: [
        text: string,
        createdAt: Date,
    ]
}

const IdPost = ({ params }: { params: { id: string } }) => {

    const [post, setPost] = useState({ _id: "", title: "", content: "", likes: 0, comments: [{ text: "", createdAt: new Date().toLocaleDateString(), }] });
    const { _id, title, content, likes, comments } = post;
    const [isLiked, setLiked] = useState(likes !== 0)

    const [newComment, setNewComment] = useState({ text: "", createdAt: new Date().toLocaleDateString() })

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

    function handleLike() {
        setLiked(true)
        const count = likes + 1;
        setPost((prev) => {
            return {
                ...prev,
                likes: count
            };
        })

        putData({ likes: count })

    }

    function handleChange(event: { target: { value: any; }; }) {
        const { value } = event.target;

        setNewComment({
            text: value,
            createdAt: new Date().toLocaleDateString(),
        })

    }

    function submitComment(event: { preventDefault: () => void; }) {

        setPost((prev) => {
            return {
                ...prev,
                comments: [newComment, ...comments,]
            };
        })

        putData({ comments: [newComment, ...comments,] }).then(() => {
            setNewComment({
                text: "",
                createdAt: new Date().toLocaleDateString(),
            })
        })

        event.preventDefault();
    }

    const putData = async (post: { _id?: string; title?: string; content?: string; likes?: number; comments?: {}[]; }) => {

        const contentType = 'application/json'

        try {
            const res: Response = await fetch(`/api/posts/${_id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(post),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status.toString())
            }

        } catch (error) {
            postMessage('Failed to add post')
        }
    }

    return (
        <main>
            <div className="container flex justify-center items-center">
                <div className="w-11/12 sm:w-3/4 p-4 sm:p-8">

                    <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block text-[#f5ba13]">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <div className='flex items-center justify-between m-1 mt-8'>
                        <h1 className="text-2xl">{title}</h1>
                        <div className='flex items-center justify-around w-24' >
                            <p className="text-[0.5rem]">{likes}</p>
                            {isLiked ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400" onClick={handleLike}>
                                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400" onClick={handleLike}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            }

                            <Link href={`/${params.id}/edit`} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f5ba13]">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </Link>
                            <DelButton _id={params.id} />
                        </div>
                    </div>

                    <hr className="mb-8 border-slate-300 dark:border-slate-500" />

                    <div>
                        <p>{content}</p>
                    </div>

                    <div className="mt-8">
                        <h1 className="text-slate-500 dark:text-slate-400">Comments</h1>
                        <hr className="border-slate-300 dark:border-slate-500" />
                        <form>
                            <input className="dark:bg-slate-700 w-3/4 border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none  font-family-inherit resize-none"
                                onChange={handleChange}
                                type="text"
                                name="comment"
                                id="comment"
                                placeholder="Leave a comment here ..."
                                required
                                value={newComment.text}
                            />
                            <button onClick={submitComment} className="bg-inherit p-1 px-2 text-[#f5ba13] border-[#f5ba13] border rounded-lg hover:text-white hover:bg-[#f5ba13]">Send</button>
                        </form>
                        {comments && comments.map((comment, index) => {
                            return (
                                <div key={index} className="my-4">
                                    <div className='flex items-center justify-start my-1'>
                                        <Image
                                            className="rounded-full shadow-md outline-none mr-4"
                                            src="/images/anon-avatar.png"
                                            alt="avatar-img"
                                            width={24}
                                            height={24}
                                        />
                                        <p>{comment.text}</p>
                                    </div>
                                    <p className="text-slate-400 dark:text-slate-500 text-xs">{comment.createdAt}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </main>

    )
}

export default IdPost;