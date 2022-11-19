import { createContext, useState } from "react";

// creating the context
export const ContextProvider = createContext();

// setting the context
const Context = (props) => {
  const [login, setLogin] = useState(null);

  return (
    <>
      <ContextProvider.Provider
        value={{
          login: [login, setLogin],
        }}
      >
        {props.children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
