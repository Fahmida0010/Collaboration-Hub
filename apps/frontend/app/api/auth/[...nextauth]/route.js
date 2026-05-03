import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.name || "",
              email: user.email,
              image: user.image || "",
            }),
          }
        );

        const data = await res.json();

        if (!data?.success) {
          console.log("Google DB save failed:", data);
        }

        return true;
      } catch (err) {
        console.log("Google signIn error:", err);
        return true; 
      }
    },
  },
});

export { handler as GET, handler as POST };