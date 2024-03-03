"use client";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Logo from "./logo";

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
        <main className="flex min-h-screen justify-center items-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center">
            <Logo color={"[#f5ba13]"} />
            <div className="flex my-12">
              <div className="relative right-5 mx-auto">
                <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-[#f5ba13] border-t-transparent shadow-md"></div>
              </div>
            </div>
          </div>
        </main>
      )
  }

};

export default IsAuth;
