import React, { useState, createContext } from "react";

export const FormContext = createContext();

export function HideForm(props) {
    const [state, setState] = useState(true);
    const changeState = ()=> {
        setState(!state)
    }

    return (
        <FormContext.Provider value={{ state, changeState }}>
            {props.children}
        </FormContext.Provider>
    )
}