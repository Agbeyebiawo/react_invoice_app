import { Link } from "react-router-dom";
import { ReactComponent as IconArrowRight } from "../../assets/icon-arrow-right.svg";

export function InvoiceItem(props) {
    const { invoice } = props;
    return (
        <>
        <div>
            <Link
                to={`/id/${invoice.id}`}
                className="link desktop"
            >
            <li 
                tabIndex="0"
                className="container invoice-list-item">
                <div className=" invoice-list-item-value invoice-id body-1 bold">
                    <span className="hash">#</span>
                    {invoice.id.slice(0,5).toUpperCase()}
                </div>
                <div className="invoice-list-item-value date light-text light-text--1 desktop">
                    <span className="extra-space">Due </span>{" "}
                    {invoice.paymentDue}
                </div>
                <div className="invoice-list-item-value text-ellipsis name light-text light-text--2">
                    {invoice.clientName}
                </div>

                <div className="invoice-list-item-value date-price-container">
                    <span className="date light-text">
                        <span className="extra-space">
                            Due
                        </span>{" "}
                        {invoice.paymentDue}
                    </span>
                    <span className="price">
                        £ {invoice.total}
                    </span>
                </div>

                <div className="invoice-list-item-value price desktop">
                    <span className="extra-space">£</span>
                    {invoice.total}
                </div>

                <div className={`invoice-list-item-value invoice-status ${invoice.status}`}>
                    <div className="status-container">
                        <span className="status-point"></span>
                        <span className="status-text">{invoice.status}</span>
                    </div>
                </div>
                <span className="invoice-list-item-value arrow">
                    <IconArrowRight />
                </span>
            </li>
            </Link>
        </div>
        </>
    )
}