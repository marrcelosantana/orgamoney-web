import { createContext, ReactNode, useState, useContext } from "react";
import Bill from "../models/bill";
import Category from "../models/category";
import Income from "../models/income";
import Month from "../models/month";
import User from "../models/user";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import api from "../services/api";

interface UserContextData {
  month: string;
  totalExit: number;
  totalEntry: number;
  totalFinal: number;
  authorization: string;
  selectMonth: Month;
  handleSetAuthorization(_user: User): void;
  getUserLocalStorage(): Promise<User>;
  handleSetMonth(month: string): void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [month, setMonth] = useState("Julho");
  const [totalEntry, setTotalEntry] = useState(0);
  const [totalExit, setTotalExit] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [selectMonth, setSelectMonth] = useState<Month>();

  const authorization = Cookies.get("authorization");

  useEffect(() => {
    getDataMonth();
  }, [month]);

  useEffect(() => {
    setTotals();
  }, [selectMonth]);

  function setTotals() {
    if (selectMonth) {
      let totalIncomes = 0;
      selectMonth.incomes.forEach((incomes) => {
        totalIncomes += incomes.value;
      });
      setTotalEntry(totalIncomes);
      let totalBills = 0;
      selectMonth.bills.forEach((bill) => {
        totalBills += bill.value;
      });
      setTotalExit(totalBills);
      setTotalFinal(totalIncomes - totalBills);
    }
  }

  function handleSetMonth(month: string): void {
    setMonth(month);
  }

  function handleSetAuthorization(_user: User): void {
    Cookies.set("authorization", JSON.stringify(_user.id));
  }

  async function getUserLocalStorage(): Promise<User> {
    const _user = await localStorage.getItem("orgamoneyUser");
    const user = JSON.parse(_user) as User;
    return user ? user : null;
  }

  async function getDataMonth() {
    const response = await api.get("/month", {
      params: { month: month },
      headers: { Authorization: JSON.parse(authorization) },
    });
    setSelectMonth(response.data as Month);
  }

  return (
    <UserContext.Provider
      value={{
        authorization,
        handleSetMonth,
        month,
        handleSetAuthorization,
        getUserLocalStorage,
        totalExit,
        totalEntry,
        totalFinal,
        selectMonth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
