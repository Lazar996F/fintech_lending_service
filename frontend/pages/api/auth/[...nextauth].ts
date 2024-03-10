import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "john@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const response = await fetch(`http://localhost:5000/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              });

            const user = await response.json()
      
            if (response.ok && user) {
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token, user }) {
          session.user = token as any;
          return session;
        },
      },
    
    })