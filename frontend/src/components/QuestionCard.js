"use client"

import { useState } from 'react';

import styles from './questionCard.module.scss';

function getName(question) {

  const name = question.split(' ').join();
  
  return name;
} 

export default function QuestionCard({
  mainQuestion,
  possibleAnswers,
}) {
  const [inputs, setInputs] = useState({});

  console.log({
    mainQuestion,
    possibleAnswers,
  });

  return (
    <>
      <fieldset>
        {possibleAnswers.map((answer) => {
          return (
            <label htmlFor={`answer-${answer.id}`} key={answer.id}>
              <input
                type="radio"
                name={getName(mainQuestion.question)}
                id={`answer-${answer.id}`}
                key={answer.title}
                value={inputs.title}
                // onChange={handleChange}
              /> {answer.title}
            </label>
          )
        })}
      </fieldset>
    </>
  );
}
