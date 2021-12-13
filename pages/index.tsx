import { signIn, signOut, useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession({ required: false })
  if (status =='authenticated') {
    return (
      <>
        Signed in as {session!.user!.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
