import styles from "./testResult.module.scss";

export default function TestResult({
  data,
}) {
  console.log({
    data,
  });

  const totalQuestions = data.questionResult.length;
  const correctAnswers = data.questionResult.filter((result) => result.resultResponse === 'correct');
  const wrongAnswers = data.questionResult.filter((result) => result.resultResponse === 'wrong');

  console.log({
    correctAnswers,
    wrongAnswers,
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
        <h4>Correct Answers</h4>
        <div className={styles.answers}>
          {correctAnswers && correctAnswers.length > 0 && (
            correctAnswers.map((answer) => (
              <div className={styles.questionBlock}>
                <h4>Question: {answer.title}</h4>
                <h4>Answer: get from api</h4>
              </div>
            ))
          )}
          {!correctAnswers || (correctAnswers && correctAnswers.length === 0) && (
            <p>Looks grim boss, you got no right answers...</p>
          )}
        </div>
        <h4>Wrong Answers</h4>
        <div className={styles.answers}>
          {!wrongAnswers || (wrongAnswers && wrongAnswers.length === 0) && (
            <p>Killing it! No wrong answers!!</p>
          )}
          {wrongAnswers && wrongAnswers.length > 0 && (
            wrongAnswers.map((answer) => (
              <div className={styles.questionBlock}>
                <h4>Question: {answer.title}</h4>
                <h4>Answer: get from api</h4>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
