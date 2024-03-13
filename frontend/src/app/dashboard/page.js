"use client"

import { useProfile } from "../../utils/useProfile";

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
      <div>
        <div>
          <h4>Previous Results</h4>
          {testResultsData.testResults.length > 0 && (
            <p>Show that data</p>
          )}
          {testResultsData.testResults.length === 0 && (
            <p>No results...</p>
          )}
        </div>
        <div>
          <h4>Available Courses</h4>
          {data && data?.courses.map((course) => (
            <div
              key={course.id}
            >
              <h5>{course.name}</h5>
              <p>Questions: {course.questions.length}</p>
              <a href={`/course/${course.id}`}>Take Course</a>
            </div>
          ))}
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
