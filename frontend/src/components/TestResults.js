import styles from "./testResults.module.scss";

export default function TestResults({
  data,
}) {
  return (
    <div
      className={styles.results}
    >
      <h4>Test Results</h4>
      {data.map((result, index) => {
        const {
          questionResult,
        } = result;

        const questionTotal = questionResult.length;
        const correctAnswers = questionResult.filter((question) => question.resultResponse === 'correct').length;

        return (
          <div
            key={`${result.title}-${index}`}
            className={styles.result}
          >
            <h5>{result.title}</h5>
            <p>Progress: {result.completed === 'true' ? 'Completed' : 'In Progress'}</p>
            <p>Score: {result.score}</p>
            <p>Correct Answers: {correctAnswers}/{questionTotal}</p>
            <a href={`/course/${result.course.id}/results/${result.id}`}>View Results</a>
          </div>
        )
      })}
    </div>
  );
}
