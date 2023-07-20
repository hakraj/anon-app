import { signIn } from "next-auth/react"
import GoogleButton from "react-google-button"


const Google = () => {
  return (
    <div className="flex justify-center items-center ">
      <GoogleButton
        type="light"
        label="Continue with Google"
        onClick={() => signIn("google")}
      />
    </div>
  )
}

export default Google;