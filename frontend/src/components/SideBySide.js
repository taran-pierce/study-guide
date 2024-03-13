import styles from './sideBySide.module.scss';

export default function SideBySide({ children }) {
  return (
    <div
      data-testid="side-by-side"
      className={styles.sideBySide}
    >
      {children}
    </div>
  );
}