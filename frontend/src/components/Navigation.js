"use client"

import { useRouter } from "next/navigation";
import { useProfile } from "../utils/useProfile";

import styles from "./navigation.module.scss";

export default function Navigation() {
  const router = useRouter();

  const {
    userProfileData,
    isNavigationOpen,
    toggleNavigationMenuOpen,
    signUserOut,
  } = useProfile();

  async function handleClick() {
    await signUserOut();

    router.push('/');
  }

  return (
    <nav
      className={styles.navigation}
    >
      <button
        type="button"
        onClick={toggleNavigationMenuOpen}
        className={styles.menuToggle}
      >Menu</button>
      <ul
        className={`${isNavigationOpen ? styles.open : ''}`}
      >
        {userProfileData && (
          <>
            <li>
              <a href="/dashboard/courses">Courses</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/profile">Profile</a>
            </li>
            <li>
              <button
                type="button"
                onClick={handleClick}
              >Sign Out</button>
            </li>
          </>
        )}
        {!userProfileData && (
          <li>
            <a href="/create-account">Create Account</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
