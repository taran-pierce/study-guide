import TestResults from './TestResults';

import styles from './dashboard.module.scss';

export default function Dashboard({
  testResultsData,
  data,
}) {
  return (
    <div
      className={styles.dashboard}
    >
      <div
        className={styles.profile}
      >
        <h4>Profile Information</h4>
        <p>
          <a href="/dashboard/profile">View Profile</a>
        </p>
      </div>
      {testResultsData?.testResults.length > 0 && testResultsData?.testResults && (
        <TestResults data={testResultsData.testResults} />
      )}
      <div
        className={styles.courses}
      >
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
    </div>
  );
}
