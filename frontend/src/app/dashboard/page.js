"use client"

import { useProfile } from "../../utils/useProfile";
import Dashboard from "../../components/Dashboard";

import { useQuery } from "@apollo/client";

import GET_ALL_TEST_RESULTS from "../../gql/GET_ALL_TEST_RESULTS.gql"
import GET_ALL_COURSES from "../../gql/GET_ALL_COURSES.gql";

export default function DashboardPage() {
  const {
    userProfileData,
  } = useProfile();

  const {
    loading,
    data,
    error,
  } = useQuery(GET_ALL_COURSES);

  const {
    data: testResultsData,
    loading: testResultsLoading,
    error: testResultsError,
  } = useQuery(GET_ALL_TEST_RESULTS);

  if (!userProfileData?.name) {
    return <p>Loading...</p>
  }
  
  return (
    <main>
      <h1>Welcome to the dashboard{userProfileData ? ` ${userProfileData?.name}` : ""}!</h1>
      <p>You ready to get your study on?</p>
      {testResultsData && data && (
        <Dashboard 
          testResultsData={testResultsData}
          data={data}
        />
      )}
    </main>
  );
}
