import React from "react";
import { useState } from "react";

const initalState = {
    username: 'bek',
    password: 'password',
    list: ['AAPL']
}

export const Context = React.createContext();
const Store = ({ children }) => {
    const [state, setState] = useState(initalState)
    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )
}


export default Store;

