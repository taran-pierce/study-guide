import styles from "./testResult.module.scss";

export default function TestResult({
  data,
}) {
  const totalQuestions = data.questionResult.length;
  const correctAnswers = data.questionResult.filter((result) => result.resultResponse === 'correct');
  const wrongAnswers = data.questionResult.filter((result) => result.resultResponse === 'wrong');

  const questions = data.course.questions;

  console.log({
    data,
    questions,
    correctAnswers,
  });

  return (
    <div className={styles.testResult}>
      <h1>Test Results for: {data.title}</h1>
      <h2>Score: {data.score}</h2>
      <h3>Passing Score: {Number(data.score) === 100 ? 'Pass' : 'Fail'}</h3>
      <h3>Question Results: {correctAnswers.length}/{totalQuestions}</h3>
      <div
        className={styles.questionListWrapper}
      >
        <h3>Correct Answers</h3>
        <div className={styles.answers}>
          {correctAnswers && correctAnswers.length > 0 && (
            correctAnswers.map((answer, index) => (
              <div className={styles.questionBlock} key={`${answer.title}-${index}`}>
                <p><strong>Question:</strong> {answer.title}</p>
                <p><strong>Answer:</strong> {answer.selectedAnswer}</p>
                {console.log(questions.filter((question) => question.id === answer.id))}
              </div>
            ))
          )}
          {!correctAnswers || (correctAnswers && correctAnswers.length === 0) && (
            <p>Looks grim boss, you got no right answers...</p>
          )}
        </div>
        <h3>Wrong Answers</h3>
        <div className={styles.answers}>
          {!wrongAnswers || (wrongAnswers && wrongAnswers.length === 0) && (
            <p>Killing it! No wrong answers!!</p>
          )}
          {wrongAnswers && wrongAnswers.length > 0 && (
            wrongAnswers.map((answer, index) => (
              <div className={styles.questionBlock} key={`${answer.title}-${index}`}>
                <p><strong>Question:</strong> {answer.title}</p>
                {console.log(wrongAnswers)}
                {console.log({
                  answer,
                })}
                <p><strong>Answer:</strong> {answer.selectedAnswer}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
