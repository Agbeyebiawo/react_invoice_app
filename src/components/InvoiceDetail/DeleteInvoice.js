import React from "react-component/lib/React";
import "./delete.scss";

const DeleteInvoice = (props) => {
  
  if(!props.showDelete)
  return (
    <div className="overlay">
        <div className="card">
            <div className="card-content">
                <div className="card-body">
                    <h1 className='invoice-list-head-title'>Confirm Deletion</h1>
                    <p className='light-text light-text--2'>
                        Are you sure you want to delete invoice #{props.id.slice(0,5).toUpperCase()}?This action cannot be undone.
                    </p>
                    <div className="buttons-menu buttons-menu--desktop end-itms">
                            <button onClick={props.showDeleteInvoice} className="primary-button default">
                                <span>Cancel</span>
                            </button>
                            <button 
                                onClick={props.deleteInvoice} 
                                className="primary-button danger">
                                <span>Delete</span>
                            </button>
                        </div>
                    <div className="invoice-mobile-menu-container">
                        
                        <div className="buttons-menu buttons-menu--mobile">
                            <button onClick={props.showDeleteInvoice} className="primary-button default">
                                <span>Cancel</span>
                            </button>
                            <button 
                                onClick={props.deleteInvoice}  
                                className="primary-button danger">
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
  return null
}

export default DeleteInvoice