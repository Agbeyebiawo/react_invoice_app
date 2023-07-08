import { useState } from "react";
import { useFormik  } from "formik";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";
import "./invoiceForm.scss";

export function EditForm(props) {
    const fetchData = JSON.parse(window.localStorage.getItem("invoices"));
    const getInvoice = fetchData.filter((i)=> i.id === props.id);

     // formik
    const formik = useFormik({
        initialValues: { ...getInvoice[0] },

        onSubmit: (values) => {
        // Adding news items to the list
        formik.values.granTotal = 0;
        const newItems = [];
        for (let elements of items) {
            elements.total = elements.quantity * elements.price;
            newItems.push(elements);

            formik.values.total += elements.total;
        }
        formik.values.items = [...newItems];
        formik.values.senderAddress = {...sender};
        formik.values.clientAddress = {...client};

        //Removing old data from the database
        const newData = fetchData.filter((i) => i.id !== props.id);

        //Saving new data to the database
        const database = [values, ...newData];
        window.localStorage.setItem("invoices", JSON.stringify(database));

        //re-render the invoice
        props.data(values);

        //Close the form
        props.formStatus();
        },
    });

    // items counter
    const [items, setItems] = useState([...formik.values.items]);
    const [sender, setSender] = useState({...formik.values.senderAddress});
    const [client, setClient] = useState({...formik.values.clientAddress})

    const handleSender=(e)=>{
        const {name,value} = e.target;
        setSender({...sender,[name]:value})
    }

    const handleClient=(e)=>{
        const {name,value} = e.target;
        setClient({...client,[name]:value})
    }

    if(!props.hide)
    return (
        <div>
        <div className="overlay u-full-width">
            <div className="content">
                <form onSubmit={formik.handleSubmit} className="container u-full-width">
                    <div className="wrapper">
                        <section>
                            <h1>Edit <span>#</span>{props.id.slice(0,5).toUpperCase()}</h1>
                            <p>Bill From</p>
                        </section>
                        {/* Sender Field */}
                        <div className="row">
                            <div className="twelve columns">
                                <label htmlFor="">Street Address</label>
                                <input
                                    type="text" 
                                    className='u-full-width'
                                    name='street'
                                    id='street'
                                    value={sender.street}
                                    onChange={handleSender}/>
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="" className='four columns'>
                                City
                                <input 
                                    type="text" 
                                    className='u-full-width'
                                    name='city'
                                    id='city'
                                    onChange={handleSender}
                                    value={sender.city}/>
                            </label>
                            <label htmlFor="" className='four columns'>
                                Post Code
                                <input 
                                    type="text"
                                    name='postCode'
                                    id='postCode'
                                    value={sender.postCode}
                                    onChange={handleSender} 
                                    className='u-full-width'/>
                            </label>
                            <label htmlFor="" className='four columns'>
                                Country
                                <input 
                                    type="text" 
                                    name='country'
                                    id='country'
                                    value={sender.country}
                                    onChange={handleSender}
                                    className='u-full-width'/>
                            </label>
                        </div>
                        {/* End of sender field */}

                        <section>
                            <p>Bill To</p>
                        </section>
                        {/* Client Field */}
                        <div className="row">
                            <div className="twelve columns">
                                <label htmlFor="">Client's Name</label>
                                <input
                                    type="text" 
                                    className='u-full-width'
                                    name='clientName'
                                    id='name'
                                    value={formik.values.clientName}
                                    onChange={formik.handleChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="twelve columns">
                                <label htmlFor="">Client's Email</label>
                                <input
                                    type="email" 
                                    className='u-full-width'
                                    name='clientEmail'
                                    id='email'
                                    placeholder='e.g. email@example.com'
                                    value={formik.values.clientEmail}
                                    onChange={formik.handleChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="twelve columns">
                                <label htmlFor="">Client's Address</label>
                                <input
                                    type="text" 
                                    className='u-full-width'
                                    name='street'
                                    id='street'
                                    value={client.street}
                                    onChange={handleClient}/>
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="" className='four columns'>
                                City
                                <input 
                                    type="text" 
                                    className='u-full-width'
                                    name='city'
                                    id='city'
                                    onChange={handleClient}
                                    value={client.city}/>
                            </label>
                            <label htmlFor="" className='four columns'>
                                Post Code
                                <input 
                                    type="text"
                                    name='postCode'
                                    id='postCode'
                                    value={client.postCode}
                                    onChange={handleClient} 
                                    className='u-full-width'/>
                            </label>
                            <label htmlFor="" className='four columns'>
                                Country
                                <input 
                                    type="text" 
                                    name='country'
                                    id='clientCountry'
                                    value={client.country}
                                    onChange={handleClient}
                                    className='u-full-width'/>
                            </label>
                        </div>
                        {/* end of client field */}
                       
                        {/* invoice field */}
                        <section className="wrapper">
                            <div className="row">
                                <label htmlFor="" className='six columns'>
                                    Invoice Date
                                    <input 
                                        type="date" 
                                        value={formik.values.paymentDue}
                                        name='paymentDue'
                                        id='paymentDue'
                                        onChange={formik.handleChange}
                                        className='u-full-width'/>
                                    </label>
                                    <label htmlFor="" className='six columns'>
                                        Payment Terms
                                        <select 
                                            className='u-full-width'
                                            name="paymentTerms" 
                                            id="paymentTerms"
                                            value={formik.values.paymentTerms}
                                            onChange={formik.handleChange}>
                                                <option value={1}>Net 1 Days</option>
                                                <option value={7}>Net 7 Days</option>
                                                <option value={14}>Net 14 Days</option>
                                                <option value={30}>Net 30 Days</option>
                                            </select>
                                    </label>
                            </div>
                        </section>

                        <div className="row">
                            <div className="twelve columns">
                                <label htmlFor="">Description</label>
                                <input 
                                    type="text"
                                    name='description'
                                    id='description'
                                    placeholder='e.g. Graphic Design Services' 
                                    className="u-full-width"
                                    value={formik.values.description}
                                    onChange={formik.handleChange} />
                            </div>
                        </div>

                        {/* Item fields */}
                        <section className="wrapper">
                            <h2>Item List</h2>
                            <div className="row">
                                {items.map((i)=> {
                                    return (
                                        <div>
                                            <label htmlFor="" className='five columns'>
                                                Item Name
                                                <input 
                                                    type="text"
                                                    name='name'
                                                    id='name'
                                                    value={i.name}
                                                    onChange={(e)=>
                                                    setItems((cItm)=>
                                                    cItm.map((x)=>
                                                        x.id === i.id
                                                            ? {...x, name: e.target.value}
                                                        : x))}
                                                    className='u-full-width' />
                                            </label>
                                            <label htmlFor="" className='two columns'>
                                                Qty.
                                                <input type="text"
                                                    name='quantity'
                                                    id='quantity'
                                                    value={i.quantity}
                                                    onChange={(e)=>
                                                    setItems((cItm)=>
                                                    cItm.map((x)=>
                                                        x.id === i.id
                                                            ? {...x, quantity: e.target.value}
                                                        : x))}
                                                    className='u-full-width' />
                                            </label>
                                            <label htmlFor="" className='two columns'>
                                                Price
                                                <input 
                                                    type="text"
                                                    name='price'
                                                    id='price'
                                                    value={i.price}
                                                    onChange={(e)=>
                                                    setItems((cItm)=>
                                                    cItm.map((x)=>
                                                        x.id === i.id
                                                            ? {...x, price: e.target.value}
                                                        : x))}
                                                    className='u-full-width' />
                                                </label>
                                                <label htmlFor="" className='two columns'>
                                                    Total
                                                    <input type="text"
                                                        value={i.quantity * i.price}
                                                        name="total"
                                                        id="total"
                                                        disabled className='u-full-width'/>
                                                </label>
                                                <label htmlFor="" onClick={(e,id)=>{
                                                    id = i.id;
                                                    setItems(items.filter((c)=>c.id !== id))
                                                }} className='one column m-y'>
                                                    <p></p>
                                                    <span className='u-full-width'>
                                                        <IconDelete />
                                                    </span>
                                                </label>
                                        </div>
                                    )
                                })}
                                <button 
                                    type='button'
                                    className="primary-button default u-full-width capitalize"
                                    onClick={()=>{
                                        setItems([
                                            ...items,
                                            {
                                                id:uuidv4(),
                                                name: "",
                                                price:"",
                                                quantity:"",
                                                total:""
                                            }
                                        ])
                                    }}>+ Add New Item</button>
                            </div>
                        </section>
                        <div className="options flex-element end-itms">
                            <div className="btn">
                                <button
                                type="button"
                                className="primary-button default m-x capitalize"
                                onClick={props.formStatus}
                                >
                                Cancel
                                </button>
                            </div>
                            <div className="btn">
                                {/* <button
                                type="submit"
                                className="draft-btn"
                                name="save"
                                onClick={() => (formik.values.status = "draft")}
                                >
                                Save as Draft
                                </button> */}
                                <button
                                type="submit"
                                className="primary-button capitalize button"
                                // onClick={() => (formik.values.status = "pending")}
                                >
                                Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    );
    return null;
}