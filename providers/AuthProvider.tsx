import React from "react";
import { useStorageState } from "./useStorageState";

export type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useAuth() {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}

export function AuthProvider(props: { children: any }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const context = {
    signIn: () => setSession("xxx"),
    signOut: () => setSession(null),
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}
