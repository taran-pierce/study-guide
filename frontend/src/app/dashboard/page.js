"use client"

import { useProfile } from "../../utils/useProfile";

export default function DashboardPage() {
  const {
    userProfileData,
  } = useProfile();

  if (!userProfileData?.name) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Welcome to the dashboard{userProfileData ? ` ${userProfileData?.name}` : ""}!</h1>
      <p>You ready to get your study on?</p>
      <div>
        <div>
          <h4>Previous Results</h4>
          <p>Stuff will go here</p>
        </div>
        <div>
          <h4>Available Courses</h4>
          <p>Stuff will go here</p>
        </div>
        <div>
          <h4>Profile</h4>
          <p>Stuff will go here</p>
          <p>
            <a href="/dashboard/profile">View Profile</a>
          </p>
        </div>
      </div>
    </main>
  );
}
