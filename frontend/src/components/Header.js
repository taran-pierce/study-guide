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
          <img src="/images/icons/study-logo.png" alt="Study Guide" />
          <h1>
            <a href="/">
              Study Guide
            </a>
          </h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
