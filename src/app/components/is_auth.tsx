"use client";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface IsAuthProps {
  children: React.ReactNode
}

const IsAuth = ({ children }: IsAuthProps) => {
  const router = useRouter();
  const { data: session, status } = useSession()

  switch (status) {
    case "unauthenticated":
      router.replace('/auth/login')
      break;

    case "authenticated":
      return (
        <>
          {children}
        </>
      )

    default:
      return (
        <main>
          <div className="container flex justify-center items-center">
            <div className="bg-white  dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
              <p>Hang on there...</p>
            </div>
          </div>
        </main>
      )
  }

}

export default IsAuth;
