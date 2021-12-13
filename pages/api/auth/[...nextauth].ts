import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'
export default NextAuth({
    // Configure one or more authentication providers
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Email',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    let res = await axios.post('http://127.0.0.1:8000/users/authentication', {
                        email: credentials.email,
                        password: credentials.password
                    })
                    console.log(res.data.data.token)
                    let user_data = res.data.data;
                    return user_data

                } catch (e) {
                    console.log(e);
                    throw new Error(e.response.data.message + '&email=' + credentials.email)
                }

            }
        })
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            console.log("jwt callback", user, token,account, profile, isNewUser)
            if (user) {
                token.accessToken = user.token
                token.name = user.username
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