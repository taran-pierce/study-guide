"use client"

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../utils/useProfile';

import {
  useQuery,
  useMutation,
} from "@apollo/client";

import GET_COURSE_DATA from "../../../gql/GET_COURSE_DATA.gql";
import CREATE_TEST_RESULT from "../../../gql/CREATE_TEST_RESULT.gql";

export default function CoursePage({
  params,
}) {
  const { id } = params;
  const router = useRouter();

  const { userProfileData } = useProfile();

  const {
    loading,
    data = {},
    error,
  } = useQuery(GET_COURSE_DATA, {
    variables: {
      where: {
        id,
      }
    }
  });

  const [createTestResult, {
    data: testResultData,
    error: testResultError,
    loading: testResultLoading,
  }] = useMutation(CREATE_TEST_RESULT);

  const { course = {} } = data;

  const { questions = [] } = course;

  async function handleClick(e) {
    e.preventDefault();

    const result = await createTestResult({
      variables: {
        data: {
          completed: "false",
          user: {
            connect: {
              id: userProfileData.id,
            }
          },
          course: {
            connect: {
              id: course.id,
            }
          },
          score: "0",
          title: course.name,
        }
      }
    });

    router.push(`/course/${id}/${questions[0].id}?nextQuestion=${questions[1].id}&currentQuestion=1&totalQuestions=${questions.length}&testId=${result.data.createTestResult.id}`);
  }

  return (
    <main>
      <h1>{course.name}</h1>
      <p>Are you ready to take this course bitch?</p>
      <p>If so, click the link below to start a test!</p>
      {questions && questions[0] && questions[0].id && (
        <p>
          <button
            type="button"
            onClick={(e) => handleClick(e)}
          >Start Test</button>
        </p>
      )}
    </main>
  );
}
