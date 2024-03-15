"use client"

import {
  useState,
} from "react";
import { useRouter } from 'next/navigation';
import {
  useMutation,
  useQuery,
} from "@apollo/client";

import useForm from '../utils/useForm';

import CREATE_USER_ACCOUNT from "../gql/CREATE_USER_ACCOUNT.gql";
import GET_CURRENT_USER from "../gql/GET_CURRENT_USER.gql";
import SIGN_USER_OUT from "../gql/SIGN_USER_OUT.gql";

import styles from "./createAccount.module.scss";

export default function CreateAccount() {
  const router = useRouter();

  const [hasError, setHasError] = useState({
    error: false,
    message: "",
  });

  const {
    loading,
    data,
  } = useQuery(GET_CURRENT_USER);

  const {
    inputs,
    handleChange,
    resetForm,
  } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [createAccount, {
    loading: createAccountLoading,
    data: createAccountData,
    error,
  }] = useMutation(CREATE_USER_ACCOUNT, {
    variables: {
      data: inputs
    },
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await createAccount({
      variables: inputs,
    });

    router.push(`/signin?newUser=${response?.data?.createUser?.name}`);
  }

  const [signUserOut, {
    loading: signUserOutLoading,
    error: signUserOutError,
    data: signUserOutData,
  }] = useMutation(SIGN_USER_OUT, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  })

  async function handleSignOut() {
    await signUserOut();

    router.push("/");
  }

  return (
    <div
      className={styles.createAccountWrapper}
    >
      {data && data.authenticatedItem && (
        <>
          <p>You are already signed in {data?.authenticatedItem.name}, do you want to sign out?</p>
          <button
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </>
      )}
      <h2>Create Account</h2>
      <form
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <fieldset disabled={createAccountLoading}>
          <label htmlFor="name">Name: 
            <input
              type="text"
              name="name"
              id="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">Email: 
            <input
              type="email"
              name="email"
              id="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">Password: 
            <input
              type="password"
              name="password"
              id="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
          >Create Account</button>
        </fieldset>
      </form>
    </div>
  );
}
