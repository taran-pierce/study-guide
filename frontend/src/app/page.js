"use client"

// import Image from "next/image";

import { useProfile } from "../utils/useProfile";

import Conatiner from "../components/Container";
// import SideBySide from "../components/SideBySide";
import SignIn from "../components/SignIn";

export default function Home() {
  const {
    userProfileData,
  } = useProfile();
  
  return (
    <main>
      <Conatiner>
        <h1>Welcome to the Study Guide</h1>
        {userProfileData && userProfileData?.name && (
          <>
            <p>Welcome back {userProfileData.name}, go ahead to the <a href="/dashboard">dashboard</a>!</p>
          </>
        )}
        {!userProfileData && !userProfileData?.name && (
          <>
            <SignIn />
          </>
        )}
      </Conatiner>
    </main>
  );
}
