import { InvoiceList } from "./components/Invoices/InvoiceList";
import { InvoiceDetail } from "./components/InvoiceDetail/InvoiceDetail";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HideForm } from "./context/HideForm";
import NewInvoice from "./components/Form/NewInvoice";

function App() {
    const [data, setData] = useState("");
    
    const getDataHandler = (values)=>{
        setData(values);
    };

    useEffect(()=>{
        return ()=>{
            setData("");
        };
    },[data]);

    const [theme, setTheme] = useState("light");
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    

        
    return (
        <>
        <HideForm>
            <NewInvoice data={getDataHandler}/>
            <Navbar onChangeTheme={themeToggler} theme={theme}/>
            <Routes>
                <Route path="/" element={<InvoiceList fetch={data}/>} />
                <Route path="/id/:id" element={<InvoiceDetail />}/>
            </Routes>

        </HideForm>
        
        </>
    )
}

export default App;

