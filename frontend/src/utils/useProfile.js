"use client"

// TODO rename to be more generic than profile
// going to put the whole state app here

import {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";

import {
  useQuery,
  useMutation,
} from "@apollo/client";

import GET_CURRENT_USER from "../gql/GET_CURRENT_USER.gql";
import SIGN_USER_OUT from "../gql/SIGN_USER_OUT.gql";

const ProfileContext = createContext({});
const ProfileContextProvider = ProfileContext.Provider;

function ProfileProvider({ children }) {
  const [userProfileData, setUserProfileData] = useState({});
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const {
    loading,
    error,
    data,
  } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (data) {
      setUserProfileData(data.authenticatedItem);
    }
  }, [data]);

  function toggleNavigationMenuOpen() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  function closeNavigationMenuOpen() {
    setIsNavigationOpen(false);
  }

  function openNavigationMenuOpen() {
    setIsNavigationOpen(true);
  }

  const [signUserOut, {
    data: signUserOutData,
    error: signUserOutError,
    loading: signUserOutLoading,
  }] = useMutation(SIGN_USER_OUT, {
    refetchQueries: [{ query: GET_CURRENT_USER }]
  });

  return (
    <ProfileContextProvider
      value={{
        userProfileData,
        setUserProfileData,
        isNavigationOpen,
        setIsNavigationOpen,
        toggleNavigationMenuOpen,
        closeNavigationMenuOpen,
        openNavigationMenuOpen,
        signUserOut,
      }}
    >
      {children}
    </ProfileContextProvider>
  );
}

function useProfile() {
  return useContext(ProfileContext);
}

export {
  useProfile,
  ProfileProvider,
}
