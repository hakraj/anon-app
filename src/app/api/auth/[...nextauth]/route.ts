import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../models/User";

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
        await dbConnect()

        const user = await User.findOne({ email, password })
        if (!user) {
          return null
        }

        return user
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
