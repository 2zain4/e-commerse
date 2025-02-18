import { createContext, useEffect, useState } from "react";

export const tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, settoken] = useState(null);

  useEffect(() => {
  if (localStorage.getItem('token')){
    settoken(localStorage.getItem('token'))
  }
  }, [])

  return (
    <tokenContext.Provider value={{ token, settoken }}>
      {children}
    </tokenContext.Provider>
  );
}
