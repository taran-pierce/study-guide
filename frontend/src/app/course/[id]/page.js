"use client"

import { useQuery } from "@apollo/client";

import GET_COURSE_DATA from "../../../gql/GET_COURSE_DATA.gql";


export default function CoursePage({
  params,
}) {
  const { id } = params;

  const {
    loading,
    data,
    error,
  } = useQuery(GET_COURSE_DATA, {
    variables: {
      where: {
        id,
      }
    }
  });

  if (!data) {
    return <p>No data found...</p>
  }

  const { course } = data;

  const { questions } = course;

  const combinedQuestions = questions.map((question) => {
    const mainQuestion = [{ question: question.question }];

    return mainQuestion.concat(question.answer, question.wrongAnswer);
  });

  return (
    <main>
      <h1>{course.name}</h1>
      <p>Each question will end up going on a separate page.</p>
      <ul>
        {combinedQuestions.map((question) => {
          const mainQuestion = question.filter((q) => q.question)[0];
          const possibleAnswers = question.filter((q) => !q.question);

          console.log({
            mainQuestion,
            possibleAnswers,
          });

          const shuffledArray = possibleAnswers.sort((a, b) => 0.5 - Math.random());

          return (
            <li>
              <h2>Question: {mainQuestion.question}</h2>
              <ul>
                {shuffledArray.map((answer) => {
                  return (
                    <li>
                      {answer.title}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </main>
  );
}
