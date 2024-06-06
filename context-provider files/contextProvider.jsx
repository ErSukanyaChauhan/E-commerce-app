import { createContext } from "react";
export const MyContext = createContext();
const ContextProvider = ({children}) => {
  return (
    <>
      <MyContext.Provider value={{number}}>
        {children}
      </MyContext.Provider>
    </>
  )
};

export default ContextProvider;
