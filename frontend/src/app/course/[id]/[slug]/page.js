"use client"

import {
  useSearchParams,
  useRouter,
} from 'next/navigation';
import { useProfile } from '../../../../utils/useProfile';
import useForm from '../../../../utils/useForm';

import {
  useQuery,
  useMutation,
} from "@apollo/client";

import GET_SINGLE_QUESTION from "../../../../gql/GET_SINGLE_QUESTION.gql";
import CHECK_QUESTION from "../../../../gql/CHECK_QUESTION.gql";
import GET_ALL_COURSES from "../../../../gql/GET_ALL_COURSES.gql";

export default function CoursePage({
  params,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    slug,
    id,
  } = params;

  const {
    userProfileData,
  } = useProfile();

  const {
    loading: coursesLoading,
    data: coursesData,
    error: coursesError,
  } = useQuery(GET_ALL_COURSES);

  const nextQuestion = searchParams.get('nextQuestion');
  const totalQuestions = Number(searchParams.get('totalQuestions'));
  const currentQuestion = Number(searchParams.get('currentQuestion'));
  const testId = searchParams.get('testId');
  
  const {
    data,
    loading,
    error,
  } = useQuery(GET_SINGLE_QUESTION, {
    variables: {
      where: {
        id: slug,
      }
    }
  });

  const [checkQuestion, {
    data: checkQuestionData,
    error: checkQuestionError,
    loading: checkQuestionLoading,
  }] = useMutation(CHECK_QUESTION);

  const possibleAnswers = [].concat([data?.question?.answer], data?.question?.wrongAnswer);

  const {
    inputs,
    handleChange,
  } = useForm({
    question: '',
  });

  if (possibleAnswers && possibleAnswers[0] === undefined) {
    return <p>loading...</p>
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const findAnswer = possibleAnswers.filter((answer) => answer.title === inputs.question);

    const response = await checkQuestion({
      variables: {
        checkQuestionId: slug,
        data: {
          resultResponse: inputs.question,
          title: data?.question?.question,
          user: userProfileData?.id,
          test: id,
          result: testId,
          answer: findAnswer[0],
        }
      }
    });

    const hasMoreQuestions = currentQuestion < totalQuestions;

    if (hasMoreQuestions) {
      router.push(`/course/${id}/${nextQuestion}?currentQuestion=${currentQuestion + 1}&totalQuestions=${totalQuestions}&testId=${testId}`);
    } else {
      router.push(`/course/${id}/results/${testId}`)
    }
  }

  return (
    <main>
      <h1>Question: {data?.question?.question}</h1>
      <form
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset className="question-set">
          {possibleAnswers?.map((possibleAnswer) => {
            return (
              <label htmlFor={possibleAnswer?.id} key={possibleAnswer?.id}>
                <input
                  type="radio"
                  id={possibleAnswer?.id}
                  name="question"
                  value={possibleAnswer?.title}
                  onChange={handleChange}
                /> {possibleAnswer?.title}
              </label>
            )
          })}
          <button
            type="submit"
            className="button"
          >Submit Answer</button>
        </fieldset>
      </form>
    </main>
  );
}
