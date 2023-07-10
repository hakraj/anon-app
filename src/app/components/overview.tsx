"use client";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Overview() {
    const { data: session, status } = useSession()
    const userEmail = session?.user?.email

    if (status === "loading") {
        return <p>Hang on there...</p>
    }

    if (status === "authenticated") {
        return (
            <div className="absolute top-[10vh] left-[10vw]">
                <p>Signed in as {userEmail}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }

    return (
        <div className="absolute top-[10vh] left-[10vw]">
            <p>Not signed in.</p>
            <button onClick={() => signIn("google")}>Sign in</button>
            <button onClick={() => signIn("facebook")}>Sign in</button>
            <button onClick={() => signIn("twitter")}>Sign in</button>
        </div>
    )
}