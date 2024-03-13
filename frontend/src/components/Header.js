"use client"

import Navigation from "./Navigation";

// import { useProfile } from "../utils/useProfile";

import styles from './header.module.scss';

export default function Header() {
  return (
    <header
      className={styles.header}
    >
      <div className={styles.navigationWrapper}>
        <div>
          <h1>Study Guide Logo</h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
