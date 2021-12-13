import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios, { AxiosError } from 'axios'
export default NextAuth({
    // Configure one or more authentication providers
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<string, string>, req) {
                try {
                    let res = await axios.post('http://127.0.0.1:8000/users/authentication', {
                        email: credentials.email,
                        password: credentials.password
                    })
                    console.log(res.data.data.token)
                    let user_data = res.data.data;
                    user_data.name = user_data.username;
                    return user_data

                } catch (e: any) {
                    console.log(e);
                    throw new Error(e.response.data.message + '&email=' + credentials.email)
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("jwt callback", user, token, account, profile, isNewUser)
            if (user) {
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, user, token }) {
            console.log("session callback", session, user, token);
            session.accessToken = token.accessToken
            return session
        }
    }
})