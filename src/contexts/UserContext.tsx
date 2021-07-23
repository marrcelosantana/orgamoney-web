import { createContext, ReactNode, useState, useContext } from "react";
import Bill from "../models/bill";
import Category from "../models/category";
import Income from "../models/income";
import Month from "../models/year";
import User from "../models/user";
import Cookies from 'js-cookie'
import router from "next/router";

interface UserContextData {
  user: User;
  handleSetUser(_user: User): void;
  verifyCookiesAndSetUser():void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  function handleSetUser(_user: User): void {
      setUser(_user);
      Cookies.set('orgamoneyUser', JSON.stringify(_user));
  }

  function verifyCookiesAndSetUser():void{
    const userCookies = Cookies.get('orgamoneyUser');
    if(userCookies){
      setUser(JSON.parse(userCookies));
      return;
    }else{
      router.push('/');
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
        verifyCookiesAndSetUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
