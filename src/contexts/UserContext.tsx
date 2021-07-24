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
  user: User;
  handleSetUser(_user: User): void;
  verifyCookiesAndSetUser(): void;
  getUserLocalStorage(): Promise<User>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {}, []);

  function handleSetUser(_user: User): void {
    setUser(_user);
    localStorage.setItem("orgamoneyUser", JSON.stringify(_user));
    Cookies.set("authorization", JSON.stringify(_user.id));
  }

  async function getUserLocalStorage(): Promise<User> {
    const _user = await localStorage.getItem("orgamoneyUser");
    const user = JSON.parse(_user) as User;
    return user ? user : null;
  }

  function verifyCookiesAndSetUser(): void {
    const userCookies = Cookies.get("orgamoneyUser");
    if (userCookies) {
      setUser(JSON.parse(userCookies));
      return;
    } else {
      router.push("/");
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
        verifyCookiesAndSetUser,
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
