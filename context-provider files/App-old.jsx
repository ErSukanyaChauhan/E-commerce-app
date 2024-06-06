import ContextProvider from "./component/contextProvider";
import ParentComp from "./component/parent";
import React, { createContext, useState } from "react";

function App() {
  return (
    <>
      <button onClick={() => setNumber(number + 1)}>increase</button>
      {/* <MyContext.Provider value={{number}}> */}
      <ContextProvider>
        <ParentComp />
      </ContextProvider>

      {/* </MyContext.Provider> */}
      {/* <ParentComp data = {"myvalue"}/> */}
      {/* here hello in h1 is children  */}
      {/* <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      <h1>Hello</h1>
      </ParentComp> */}
    </>
  );
}

export default App;
