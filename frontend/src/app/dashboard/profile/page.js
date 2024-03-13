"use client"

import { useQuery } from "@apollo/client"; 

import GET_CURRENT_USER from "../../../gql/GET_CURRENT_USER.gql";

export default function DashboardProfilePage() {
  const {
    data,
    loading,
    error,
  } = useQuery(GET_CURRENT_USER);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Profile</h1>
      <ul>
        {data?.authenticatedItem && (
          <>
            <li>Name: {data?.authenticatedItem?.name}</li>
            <li>Email: {data?.authenticatedItem?.email}</li>
            <li>Account Created: {data?.authenticatedItem?.createdAt}</li>
          </>
        )}
      </ul>
    </main>
  );
}
