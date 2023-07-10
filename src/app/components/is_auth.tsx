"use client";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

interface IsAuthProps {
    children: React.ReactNode
}

const IsAuth = ({ children }: IsAuthProps) => {
    const router = useRouter();
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "unauthenticated") { router.replace('/auth/login') }
    }, [router, status]);
    // const userEmail = session?.user?.email

    if (status === "authenticated") {
        return (
            <>
                {children}
            </>
            // <div className="absolute top-[10vh] left-[10vw]">
            //     <p>Signed in as {userEmail}</p>
            //     <button onClick={() => signOut()}>Sign out</button>
            // </div>
        )
    }

    return (
        <main>
            <div className="container flex justify-center items-center">
                <div className="bg-white  dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
                    <p>Hang on there...</p>
                </div>
            </div>
        </main>
    )

    // <div className="absolute top-[10vh] left-[10vw]">
    //     <p>Not signed in.</p>
    //     <button onClick={() => signIn("google")}>Sign in</button>
    //     <button onClick={() => signIn("facebook")}>Sign in</button>
    //     <button onClick={() => signIn("twitter")}>Sign in</button>
    // </div>
}

export default IsAuth;

// Usage in a page component
// import { withAuth } from './withAuth';

// const ProtectedPage = () => {
//   return <div>This page is protected by authentication.</div>;
// };

// export default withAuth(ProtectedPage);

