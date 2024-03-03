'use client'

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEventHandler, ChangeEventHandler } from "react";

import FormTitle from "@/app/components/auth/form_title";
import FormBtn from "@/app/components/auth/form_btn";
import Google from "@/app/components/auth/google";
import Alt from "@/app/components/auth/alt";
import { PostUser, confirmUser } from "../../../../utils/user";
import ErrorMessage from "@/app/components/auth/error_message";



const Signup = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      confirmUser(session);

      if (session?.user?.name) {
        router.push('/');
      }
    }
  }, [router, session, status,]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (credentials.password.length >= 8) {
      const res = await PostUser(credentials);

      if (res.sucesss) {
        const user = await signIn("credentials", { ...credentials, redirect: false })
        if (user?.error === null) {
          setLoading(false)
          router.push('/auth/onboarding/username')
        } else {
          const err = user?.error as string;
          setLoading(false)
          setError("invalid credentials")
        }
      } else {
        console.log(res.error);
        setLoading(false)
        setError("something went wrong")
        throw new Error("something went wrong")
      }
    } else {
      setLoading(false)
      setError("password cannot be less than 8 characters ")
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
        <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
          <form onSubmit={handleSubmit}>
            <FormTitle text={"Please sign up"} />

            <div className="form-floating text-left my-1">
              <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="floatingEmail">Email</label><br />
              <input
                onChange={handleChange}
                type="email"
                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none text-sm font-family-inherit resize-none"
                id="floatingEmail"
                placeholder="name@example.com"
                required
                name="email"
                value={credentials.email}
                autoFocus
              />
            </div>
            <div className="form-floating relative text-left my-1 ">
              <label className="text-sm  text-slate-600 dark:text-slate-400" htmlFor="floatingPassword">Password</label><br />
              <input
                onChange={handleChange}
                type={viewPassword ? "text" : "password"}
                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none text-sm font-family-inherit resize-none"
                id="floatingPassword"
                placeholder="**********"
                required
                name="password"
                minLength={8}
                value={credentials.password}
              />
              {!viewPassword ?
                <svg onClick={() => setViewPassword(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-slate-300 dark:text-slate-500 hover:text-[#f5ba13] absolute right-4 bottom-2 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                :
                <svg onClick={() => setViewPassword(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-slate-300 dark:text-slate-500 hover:text-[#f5ba13] absolute right-4 bottom-2 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              }
            </div>
            {error && <ErrorMessage text={error} />}
            <FormBtn loading={loading} text="Login" />

            <p className="text-xs text-slate-400 dark:text-slate-600 my-4">or</p>

            <Google />

            <Alt use="signup" />

          </form>
        </div >
      </div >
    </main >
  )
}

export default Signup;