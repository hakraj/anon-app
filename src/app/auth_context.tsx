"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
    children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>;
}


// "use client";

// import { useSession } from "next-auth/react";

// export default function ProfileMenu() {
//   const { data } = useSession();

//   return (
//     <div>
//       <p>{data?.user?.name}</p>
//       <p>{data?.user?.email}</p>
//     </div>
//   );
// }
