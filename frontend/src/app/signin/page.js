// import Image from "next/image";
import Conatiner from "../../components/Container";
import SignIn from "../../components/SignIn";

export default function SignInPage() {
  return (
    <main>
      <Conatiner>
        <h1>Sign In</h1>
        <SignIn />
        <p>or you can create a new account here: <a href="/create-account">Create an Account</a></p>
      </Conatiner>
    </main>
  );
}
