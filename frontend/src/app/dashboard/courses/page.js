"use client"

import { useQuery } from "@apollo/client";

import Course from "../../../components/Course";

import GET_ALL_COURSES from "../../../gql/GET_ALL_COURSES.gql";

export default function CoursesPage() {
  const {
    data,
    loading,
    error,
  } = useQuery(GET_ALL_COURSES);

  return (
    <main>
      <h1>Courses</h1>
      <p>Here are the available courses for you to take:</p>
      {data && (
        <Course data={data.courses} />
      )}
    </main>
  );
}
