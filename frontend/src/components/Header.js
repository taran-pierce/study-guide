"use client"

import Navigation from "./Navigation";

import styles from './header.module.scss';

export default function Header() {
  return (
    <header
      className={styles.header}
    >
      <div className={styles.navigationWrapper}>
        <div>
          <h1><a href="/">Study Guide Logo</a></h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
