import { createContext, ReactNode, useState, useContext } from "react";
import Bill from "../models/bill";
import Category from "../models/category";
import Income from "../models/income";
import Month from "../models/year";
import User from "../models/user";

interface UserContextData {
  user: User;
  handleSetUser(_user: User): void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  function handleSetUser(_user: User): void {
    setUser(_user);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
