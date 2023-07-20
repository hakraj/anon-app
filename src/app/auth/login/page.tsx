'use client'

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";

import FormTitle from "@/app/components/auth/form_title";
import FormBtn from "@/app/components/auth/form_btn";
import Google from "@/app/components/auth/google";
import Alt from "@/app/components/auth/alt";
import { confirmUser } from "../../../../utils/user";
import ErrorMessage from "@/app/components/auth/error_message";



const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [credentials, setCredentials] = useState({ email: "", password: "", })
  const [error, setError] = useState("")
  const [viewPassword, setViewPassword] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      confirmUser(session);
      console.log(session);

      if (session?.user?.name) {
        router.push('/');
      }
    }
  }, [router, session, status,]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const user = await signIn("credentials", { ...credentials, redirect: false })

    if (user?.error === null) {
      router.push('/')
    } else {
      const err = user?.error as string;
      setError("Invalid login credentials")
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
            <FormTitle text={"Please Login"} />

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
                value={credentials.password}
              />
              {!viewPassword ?
                <svg onClick={() => setViewPassword(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-[#f5ba13] absolute right-4 bottom-3 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                :
                <svg onClick={() => setViewPassword(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-[#f5ba13] absolute right-4 bottom-3 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              }
            </div>

            {error && <ErrorMessage text={error} />}
            <FormBtn error={!error} text="Login" />

            <p className="text-xs text-slate-400 dark:text-slate-600 my-4">or</p>

            <Google />

            <Alt use="login" />
          </form>
        </div >
      </div >
    </main >


  )
}

export default Login;