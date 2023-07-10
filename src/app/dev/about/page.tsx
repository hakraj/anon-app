/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import Image from "next/image";


const About = () => {
    const router = useRouter();

    return (
        <main className="mb-10">
            <header className="flex items-center flex-col mt-[10%]">
                <Image
                    priority
                    src="/images/pfp.jpg"
                    className="rounded-full shadow-md outline-none"
                    height={144}
                    width={144}
                    alt="dox_dev_img"
                />
                <h1 className="text-4xl my-10">hak_raj</h1>
            </header>
            <section className="text-xl text-center mx-auto w-4/5 lg:w-1/2">
                <p>Hello, I'm hak_raj. i'm softare developer and web3 enthusiast. You can contact me on <a className="text-blue-500" href='https://twitter.com/hak_raj_codes'>twitter 🐦</a>. This is a simple intro, let's connect across all newtork. Actively sharing what i learn. Big on community 🚀, Big on dev 💻.</p>
            </section>
            <div className="container flex justify-center items-center">
                <div className="bg-white  dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
                    <button onClick={() => { signOut(); router.replace('/auth/login') }} className="hover:bg-white text-xl w-full p-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white bg-[#f5ba13]">Log Out</button>
                </div>
            </div>
        </main>
    );
}

export default About