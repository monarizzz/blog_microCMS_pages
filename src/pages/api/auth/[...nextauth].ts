import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_ID) {
  throw new Error('Invalid/Missing environment variable: "GOOGLE_ID"');
}
if (!process.env.GOOGLE_SECRET) {
  throw new Error('Invalid/Missing environment variable: "GOOGLE_SECRET"');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
