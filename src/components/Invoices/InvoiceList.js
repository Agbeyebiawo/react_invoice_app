import { ReactComponent as IconArrowDown } from "../../assets/icon-arrow-down.svg";
import { ReactComponent as IconPlus } from "../../assets/icon-plus.svg";
import { ReactComponent as EmptyIllustration } from "../../assets/illustration-empty.svg";
import { useState, useEffect, useContext } from "react";
import { InvoiceItem } from "./InvoiceItem";
import { localInvoiceStorage } from "../../hook/localInvoiceStorage";
import useLocalInvoiceStorage from "../../hook/useLocalInvoiceStorage"
import "./invoiceList.scss";
import { FormContext } from "../../context/HideForm";

export function InvoiceList(props) {
    localInvoiceStorage();
    const { changeState } = useContext(FormContext);

    const [appData, setAppData] = useLocalInvoiceStorage("invoices",[]);
    const [data] = useLocalInvoiceStorage("invoices");
    const [filter, setFilter] = useState("filter by status");
    const [invoices, setInvoices] = useState(data);

    useEffect(()=>{
        if(props.fetch) setAppData([props.fetch, ...appData]);
        setInvoices(data);
    }, [props.fetch]);
    

    // const filterHandler = (value)=>{
    //     (value !== "all" || value !== "filter by status") ? setInvoices([...data.filter((dt)=> data.status === value)])
    //     : setInvoices([...data]);
    // };

    // const filterHandler = ()=>{
    //     if(filter === "filter by status" || filter === "all"){
    //         setInvoices([...data.filter((dt)=> dt.status === filter)])
    //     }else{
    //         setInvoices([...data]);
    //     }
    // }

    const filteredInvoice = invoices.filter(invoice=>{
            if(filter === "filter by status"){
                return true;
            }else{
                return invoice.status === filter;
            }
    })


    const handleChange = (e)=>{
        setFilter(e.target.value);
    }

    return (
        <>
        <div className="container">
        <div className="invoice-list-head flex-row">
            <div className="six columns">
                <h1 className="invoice-list-head-title">Invoice</h1>
                <p className="light-text light-text--1 desktop">
                    There are {filteredInvoice.length} total invoices
                </p>
                <p className="light-text light-text--1 mobile">
                    {filteredInvoice.length} invoices
                </p>
            </div>
            <div className="flex-inline">
            <select 
                onChange={handleChange}
                name="filter"
                id="filter"
                className="invoice-filter body-1 bold desktop select">
                <option value="filter by status">Filter by status
                    <IconArrowDown />
                </option>
                {/* <option value="all">All</option> */}                
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
            </select>
            <select 
                onChange={handleChange}
                name="filter"
                id="filter"
                className="invoice-filter body-1 bold mobile">
                <option value="filter by status">Filter by status
                    <IconArrowDown />
                </option>
                {/* <option value="all">All</option> */}
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
            </select>
            <button className="primary-button with-icon">
                <span className="button-icon-container">
                    <IconPlus />
                </span>
                <span className="desktop" onClick={changeState}>New Invoice</span>
                <span className="mobile" onClick={changeState}>New</span>
            </button>
            </div>
            
        </div>
        </div>
        
        {filteredInvoice.length > 0 ? (
            filteredInvoice.map((invoice)=>
                (
                    <ul className="container invoice-list">
                        <InvoiceItem key={invoice.id} invoice={invoice}/>
                    </ul>
                )
            )
        ): (
            <div className="invoice-list-empty">
                <EmptyIllustration />
                <h2 className="invoice-list-empty-title">There is nothing here</h2>
                <p className="light-text">Create an invoice by clicking the{" "}
                    <span className="bold">New Invoice</span> button and get started</p>
            </div>
        )}
        
        </>
    )
}