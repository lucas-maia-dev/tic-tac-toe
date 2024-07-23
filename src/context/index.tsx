"use client"
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children } : {
  children: React.ReactNode;
}) {
  let [turn, setTurn] = useState("x");

  return (
    <AppContext.Provider value={{
        turn,
        setTurn
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}