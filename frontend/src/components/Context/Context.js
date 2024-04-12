import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const deleteData = createContext("");
const Context = ({ children }) => {
  const [udata, setUdata] = useState("");
  const [updata, setUpdata] = useState("");
  const [dData, setDdata] = useState("");
  return (
    <addData.Provider value={{ udata, setUdata }}>
      <updateData.Provider value={{ updata, setUpdata }}>
        <deleteData.Provider value={{ dData, setDdata }}>
          {children}
        </deleteData.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default Context;
