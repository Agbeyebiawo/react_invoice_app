import React from "react";

export function InvoiceBody(props) {
    const { invoice } = props;

    return (
        <>
        <div className="invoice-display-main">
          {invoice ? (
            <div className="flex-row invoice-top">
              <div className="flex-col id-description">
                <h3 className="item-title invoice-item-title">
                  <span className="hash">#</span>
                  {invoice.id.slice(0,5).toUpperCase()}
                </h3>
                <span className="light-text light-text--1">
                  {invoice.description}
                </span>
              </div>
              <div className="invoice-address">
                <span className="light-small">
                  {invoice ? invoice["senderAddress"]["street"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["senderAddress"]["city"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["senderAddress"]["postCode"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["senderAddress"]["country"] : null}
                </span>
              </div>
            </div>
          ) : null} 

          {invoice ? (
            <div className="flex-row flex-row--stretch invoice-mid">
              <div className="flex-col flex-col--space-between">
                <div className="flex-col">
                  <span className="light-text light-text--1 invoice-item-light">
                    Invoice Date
                  </span>
                  <span className="item-title invoice-item-title">
                    {invoice.createdAt}
                  </span>
                </div>
                <div className="flex-col">
                  <span className="light-text light-text--1 invoice-item-light">
                    Payment Due
                  </span>
                  <span className="item-title invoice-item-title">
                    {invoice.paymentDue}
                  </span>
                </div>
              </div>

              <div className="flex-col invoice-bill-col">
                <span className="light-text light-text--1 invoice-item-light">
                  Bill To
                </span>
                <span className="item-title invoice-item-title word-wrap">
                  {invoice ? invoice["clientName"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["clientAddress"]["street"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["clientAddress"]["city"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["clientAddress"]["postCode"] : null}
                </span>
                <span className="light-small">
                  {invoice ? invoice["clientAddress"]["country"] : null}
                </span>
              </div>

              <div className="flex-col invoice-email-col">
                <span className="light-text light-text--1 invoice-item-light">
                  Sent to
                </span>
                <span className="item-title invoice-item-title word-wrap">
                  {invoice ? invoice["clientEmail"] : null}
                </span>
              </div>
            </div>
          ) : null}

          {invoice ? (
            <div className="flex-col invoice-items-balance">
              {/* List Items */}
              <ul className="flex-col invoice-list-container">
                <li className="flex-row flex-row--center invoice-list-item">
                  <span className="light-small text-ellipses invoice-list-value invoice-list-name">
                    Item Name
                  </span>
                  <span className="light-small invoice-list-value invoice-list-quantity">
                    QTY.
                  </span>
                  <span className="light-small invoice-list-value invoice-list-price">
                    Price
                  </span>
                  <span className="light-small invoice-list-value invoice-list-total">
                    Total
                  </span>
                </li>

                {invoice.items.map((item, i) => {
                  return (
                    <div className="invoice-dynamic-items-container" key={i}>
                      {/* Desktop */}
                      <li
                        key={i + "d"}
                        className="flex-row flex-row--center invoice-list-item"
                        tabIndex="0"
                      >
                        <span className="body-1 bold invoice-list-value invoice-list-name">
                          {item.name}
                        </span>
                        <span className="light-text light-text--1 bold invoice-list-value invoice-list-quantity">
                          {item.quantity}
                        </span>
                        <span className="light-small light-text--1 bold invoice-list-value invoice-list-price">
                          <span className="extra-space">£ </span>
                          {item.price}
                        </span>
                        <span className="body-1 bold invoice-list-value invoice-list-total">
                          <span className="extra-space">£ </span>
                          {item.total}
                        </span>
                      </li>
                      {/* Mobile */}
                      <li
                        key={i + "m"}
                        className="flex-row flex-row--center invoice-list-item-mobile"
                        tabIndex="0"
                      >
                        <div className="flex-col">
                          <span className="body-1 bold invoice-list-value invoice-list-name word-wrap">
                            {item.name}
                          </span>
                          <span className="light-text light-text--3 bold">
                            {item.quantity} x{" "}
                            <span className="extra-space">£</span>
                            {item.price}
                          </span>
                        </div>
                        <span className="body-1 bold invoice-list-value invoice-list-total">
                          <span className="extra-space">£ </span>
                          {item.total}
                        </span>
                      </li>
                    </div>
                  );
                })}
              </ul>
              {/* List Total */}
              <div className="flex-row flex-row--center invoice-balance-total">
                <span className="body-2">Amount Due</span>
                <span className="big-total bold">
                  <span className="extra-space">£ </span>
                  {invoice.total}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        </>
    )
}