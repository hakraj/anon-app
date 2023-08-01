import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "../../../../../utils/user";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, _req) {
        const { email, password } = credentials as { email: string, password: string };
        //peform logic and find uer from db
        const user = await getUser({ email, password })

        if (!user.data) {
          return null
        }

        return user.data
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  pages: {
    signIn: "/auth/login/",
    signOut: "/auth/login/"
  }

})

export { handler as GET, handler as POST }
