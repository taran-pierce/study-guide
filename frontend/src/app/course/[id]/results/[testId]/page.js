"use client"

import { useQuery } from "@apollo/client";

import TestResult from "../../../../../components/TestResult";

import GET_SINGLE_TEST_RESULT from "../../../../../gql/GET_SINGLE_TEST_RESULT.gql";

export default function TestIdPage({
  params,
}) {
  const {
    testId,
  } = params;

  const {
    data,
    loading,
    error
  } = useQuery(GET_SINGLE_TEST_RESULT, {
    variables: {
      where: {
        id: testId,
      }
    }
  });

  console.log({
    data,
    loading,
    error,
  });

  return (
    <main>
      {data && (
        <TestResult data={data.testResult} />
      )}
    </main>
  )
}
