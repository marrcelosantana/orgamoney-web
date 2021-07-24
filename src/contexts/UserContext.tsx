import { createContext, ReactNode, useState, useContext } from "react";
import Bill from "../models/bill";
import Category from "../models/category";
import Income from "../models/income";
import Month from "../models/year";
import User from "../models/user";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";

interface UserContextData {
  month: string;
  handleSetAuthorization(_user: User): void;
  getUserLocalStorage(): Promise<User>;
  handleSetMonth(month: string): void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [month, setMonth] = useState("Abril");
  function handleSetMonth(month: string): void {
    setMonth(month);
  }
  useEffect(() => {}, []);

  function handleSetAuthorization(_user: User): void {
    Cookies.set("authorization", JSON.stringify(_user.id));
  }

  async function getUserLocalStorage(): Promise<User> {
    const _user = await localStorage.getItem("orgamoneyUser");
    const user = JSON.parse(_user) as User;
    return user ? user : null;
  }

  return (
    <UserContext.Provider
      value={{
        handleSetMonth,
        month,
        handleSetAuthorization,
        getUserLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
