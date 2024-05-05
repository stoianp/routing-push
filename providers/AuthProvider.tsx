import React, { useEffect, useState } from "react";
import { ReactNativeFirebase } from "@react-native-firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

//import NativeFirebaseError = ReactNativeFirebase.NativeFirebaseError;

import { useStorageState } from "./useStorageState";

const STORAGE_KEY = "UserAuthData";

export type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  user: null,
  isLoading: false,
});

export function useAuth() {
  const value = React.useContext(AuthContext);

  return value;
}

export function AuthProvider(props: { children: JSX.Element }): JSX.Element {
  //const [[isLoading, user], setUser] = useStorageState(STORAGE_KEY);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (isLoading) setIsLoading(false);
    });

    return subscriber;
  }, []);

  async function signIn(email: string, password: string) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function signUp(email: string, password: string) {
    console.log("sign up", email, password);

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    console.log("sign out: ");
    await auth().signOut();
  }

  const value: AuthContextType = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    user: user,
    isLoading: isLoading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
