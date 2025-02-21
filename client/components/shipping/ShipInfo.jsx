import React from 'react'

const ShipInfo = () => {
  return (
    <ol className="list-decimal list-inside space-y-4 leading-relaxed">
            <li>
              Deliveries within Lahore are completed in <mark>2-3 days.</mark>
            </li>
            <li>
              Deliveries to other cities take about <mark>3-5 days.</mark>
            </li>
            <li>
              Delivery <mark>charges are Rs. 200,</mark> with free delivery for
              orders <mark>above 3000.</mark>
            </li>
            <li>
              Please place your order promptly to receive your product as soon
              as possible.
            </li>
            <li>
              For any queries, call us at{" "}
              <span className="obviously">
                {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
              </span>{" "}
              or leave a voice note.
            </li>
          </ol>
  )
}

export default ShipInfo