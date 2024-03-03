'use client'

import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { confirmUser, getUser, onboardUser } from "../../../../../utils/user";
import { useSession } from "next-auth/react";

import ErrorMessage from "@/app/components/auth/error_message";
import FormBtn from "@/app/components/auth/form_btn";
import FormTitle from "@/app/components/auth/form_title";


const Onboarding = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      confirmUser(session);
      if (session?.user?.name) {
        router.push('/');
      }
    }
  }, [router, session, status,]);

  const userEmail = session?.user?.email as string;

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { value } = e.target;

    setUsername(value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    const user = await getUser({ name: username })
    if (user.data) {
      setLoading(false)
      return setError("username is already taken")
    } else {
      const res = await onboardUser({ email: userEmail, name: username });

      if (res.sucesss) {
        setLoading(false)
        router.push('/')
      } else {
        setError("error")
        setLoading(false)
        throw new Error("error")
      }
    }
  }

  return (
    <main>
      <div className="container flex justify-center items-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
          <form onSubmit={handleSubmit}>
            <FormTitle text="Choose Username" />
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">you can always change it later</p>

            <div className="form-floating text-left my-1">
              <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="floatingUsername">Username</label><br />
              <input
                onChange={handleChange}
                type="text"
                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none text-sm font-family-inherit resize-none"
                id="floatingUsername"
                placeholder="Type here ..."
                required
                name="username"
                value={username}
                autoFocus
              />
            </div>

            {error && <ErrorMessage text={error} />}
            <FormBtn loading={loading} text="Next" />

          </form>
        </div >
      </div >
    </main >

  )
}

export default Onboarding;