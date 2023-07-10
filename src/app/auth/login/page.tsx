'use client'

import Logo from "@/app/components/logo";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import GoogleButton from 'react-google-button'

const Login = () => {
    const router = useRouter();
    const { data: session, status } = useSession()
    const [credentials, setCredentials] = useState({ email: "", password: "", redirect: false })

    useEffect(() => {
        if (status === "authenticated") { router.replace('/') }
    }, [router, status]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const res = await signIn("credentials", credentials)

        if (res?.error === null) {
            router.replace('/')
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const { name, value } = e.target;

        setCredentials((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    }


    return (
        <main>
            <div className="container flex justify-center items-center">
                <div className="bg-white  dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
                    <form onSubmit={handleSubmit}>
                        <Logo color={"[#f5ba13]"} />
                        <h1 className="my-4 text-xl text-slate-600 dark:text-slate-400">Please Login</h1>

                        <div className="form-floating text-left  my-1">
                            <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="floatingEmail">Email</label><br />
                            <input
                                onChange={handleChange}
                                type="email"
                                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none  font-family-inherit resize-none"
                                id="floatingEmail"
                                placeholder="name@example.com"
                                required
                                name="email"
                                value={credentials.email}
                                autoFocus
                            />
                        </div>
                        <div className="form-floating text-left my-1 ">
                            <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="floatingPassword">Password</label><br />
                            <input
                                onChange={handleChange}
                                type="password"
                                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none  font-family-inherit resize-none"
                                id="floatingPassword"
                                placeholder="**********"
                                required
                                name="password"
                                value={credentials.password}
                            />
                        </div>
                        <button className="mt-4 hover:bg-white text-xl w-full p-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white bg-[#f5ba13]">Login</button>
                        <p className="text-slate-400 dark:text-slate-600 my-4">or</p>
                        <div className="flex justify-center items-center ">
                            <GoogleButton
                                type="light"
                                label="Continue with Google"
                                onClick={() => signIn("google")}
                            />
                        </div>
                        <p className="mt-4 text-sm text-slate-400 dark:text-slate-600">Don&apos;t have an account? <br /><Link className="underline" href="/auth/signup">Signup here</Link>.</p>
                    </form>
                </div >
            </div >
        </main >


    )
}

export default Login;