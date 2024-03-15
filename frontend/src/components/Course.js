import styles from './course.module.scss';

export default function Course({
  data,
}) {
  return (
    <div
      className={styles.course}
      >
        {data.map((course) => {
          return (
            <div
              key={course.id}
            >
              <h2>{course.name}</h2>
              <p>Some cool description would be nice.</p>
              <p>Question Count: {course.questions.length}</p>
              <a href={`/course/${course.id}`}>Take Course</a>
            </div>
          )
        })}
      </div>
  );
}
