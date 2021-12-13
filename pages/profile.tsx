import { signIn, signOut, useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession({ required: true })
  if (status == 'authenticated') {
    console.log("session", session);

    return (
      <>
        Signed in as {session!.user!.name} <br />
        Signed in as {session!.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }else {
      console.log("profile no data")
    return(
        <div></div>
     )
  }
  
}
