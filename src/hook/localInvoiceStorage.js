import { localInvoiceData } from "../data/data";

export function localInvoiceStorage(){
    // window.localStorage.clear("invoices")
    window.localStorage.getItem("invoices") === null &&
    window.localStorage.setItem("invoices",JSON.stringify(localInvoiceData));
}