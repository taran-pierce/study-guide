'use client'

import {
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  useMutation,
  useQuery,
} from "@apollo/client";
import useForm from "../utils/useForm";

import SIGN_IN from '../gql/SIGN_IN.gql';
import GET_CURRENT_USER from '../gql/GET_CURRENT_USER.gql';

import styles from './signIn.module.scss';

export default function SignIn() {
  const router = useRouter();

  const [hasError, setHasError] = useState({
    error: false,
    message: '',
  });

  const {
    loading: userLoading,
    data: userData,
  } = useQuery(GET_CURRENT_USER);

  const {
    inputs,
    handleChange,
    resetForm,
  } = useForm({
    email: '',
    password: '',
  });

  const [signIn, {
    loading,
    error,
    data,
  }] = useMutation(SIGN_IN, {
    variables: inputs,
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await signIn();

    const {
      authenticateUserWithPassword,
      authenticatedItem,
    } = response.data;

    if (authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure') {
      setHasError({
        error: true,
        message: authenticateUserWithPassword?.message || 'error!',
      });
    }

    if (authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordSuccess') {
      setHasError({
        error: false,
        message: '',
      });

      router.push('/dashboard');
    }
  }

  return (
    <div
     className={styles.signInWrapper}
    >
      <h2>Sign In</h2>
      {hasError.error && (
        <p>Error: {hasError.message}</p>
      )}
      {!userData?.authenticatedItem && (
        <form
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <fieldset disabled={loading}>
            <label htmlFor="email">Email: 
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              />
            </label>
            <label htmlFor="password">Password: 
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              className="button"
            >Sign In</button>
          </fieldset>
        </form>
      )}
    </div>
  );
}
