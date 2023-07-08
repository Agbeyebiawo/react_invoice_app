import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconArrowLeft } from "../../assets/icon-arrow-left.svg";
import "./invoiceDetail.scss";
import useLocalInvoiceStorage from "../../hook/useLocalInvoiceStorage"
import { InvoiceBody } from "./InvoiceBody";
import { useState } from "react";
import { EditForm } from "../Form/EditInvoice";
import DeleteInvoice from "./DeleteInvoice";
// import "./delete.scss";

export function InvoiceDetail(){

    const [data, setData] = useLocalInvoiceStorage("invoices");

    const params = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(
        data.filter((d) => d.id === params.id)
    );
    
    const markAsPaid = ()=>{
        const changeData = []
            for(let e of data) {
                if(e.id === params.id){
                    e.status = "paid"
                }
                changeData.push(e)
            }
        

        const newInvoice = changeData.filter((i)=> i.id === params.id);
        setData(changeData);
        setInvoice(newInvoice);
        navigate(-1);
    };
 
    const deleteInvoice = ()=>{
        const newData = data.filter((i)=> i.id !== params.id);
        setData(newData);
        navigate(-1);
    };

    const [hideForm, setHideForm] = useState(true);
    const [showDelete, setShowDelete] = useState(true);

    const showDeleteInvoice = ()=>{
        setShowDelete(!showDelete)
    }

    const editItem = ()=>{
        setHideForm(!hideForm);
    }

    const getDataHandler = (values)=>{
        setInvoice([values]);
    }

    return (
        <>
            <div>
                <EditForm 
                    hide={hideForm}
                    formStatus={editItem}
                    id={invoice[0].id}
                    data={getDataHandler}/>
            </div>
            <DeleteInvoice id={invoice[0].id} showDelete={showDelete} deleteInvoice={deleteInvoice} showDeleteInvoice={showDeleteInvoice}/>
            
            <div className="container invoice-display-card">
                <div className="back-nav">
                    <span onClick={()=>navigate(-1)} className="back-btn body-1 back-nav-text">    
                        <IconArrowLeft />
                        Go Back
                    </span>
                </div>

                <div className="invoice-display-head">
                    <span className="light-text light-text--2">
                        Status
                    </span>
                    {invoice ? (
                        <div className={`status invoice-status ${invoice[0].status}`}>
                            <div className="status-container">
                                <span className="status-point"></span>
                                <span className="status-text">
                                    {invoice[0].status}
                                </span>
                            </div>
                        </div>
                    ) : null}

                    <div className="buttons-menu buttons-menu--desktop">
                        <button className="primary-button default capitalize" onClick={editItem}>
                            <span>Edit</span>
                        </button>
                        <button 
                            onClick={showDeleteInvoice} 
                            className="primary-button danger capitalize">
                            <span>Delete</span>
                        </button>
                        <button onClick={markAsPaid} className="primary-button  capitalize">
                            <span>Mark as Paid</span>
                        </button>
                    </div>
                </div>

                {invoice ? (
                    <InvoiceBody invoice={invoice[0]}/>
                ) : null}

                {/* <div className="invoice-display-main">
                    {invoice ? (
                        <div className="flex-row invoice"></div>
                    ) : null}
                </div> */} 
            </div>
            <div className="invoice-mobile-menu-container">
                <div className="mobile-menu-absolute-container">
                    <div className="buttons-menu buttons-menu--mobile">
                        <button className="primary-button default" onClick={editItem}>
                            <span>Edit</span>
                        </button>
                        <button onClick={showDeleteInvoice} className="primary-button danger">
                            <span>Delete</span>
                        </button>
                        <button onClick={markAsPaid} className="primary-button">
                            <span>Mark as Paid</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
