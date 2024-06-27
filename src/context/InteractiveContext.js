import { createContext, useState } from "react";

const InteractiveContext = createContext();

const InteractiveProvider = ({ children }) => {

  const [menu, setMenu] = useState('text');
  return (
    <InteractiveContext.Provider value={{ menu, setMenu}}>
      {children}
    </InteractiveContext.Provider>
  );
};

export { InteractiveProvider, InteractiveContext };
