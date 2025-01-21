"use client";

import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { PlusOneOutlined } from "@mui/icons-material";

export default function Accordions({ description }) {
  const [expanded, setExpanded] = useState("brief");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="md:w-3/4 mx-auto">
      <Accordion
        expanded={expanded === "brief"}
        onChange={handleChange("brief")}
      >
        <AccordionSummary className="Havelock_Medium">Brief</AccordionSummary>
        <AccordionDetails className="border border_color product__description">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "ship"} onChange={handleChange("ship")}>
        <AccordionSummary className="Havelock_Medium">
          Shipping Info
        </AccordionSummary>
        <AccordionDetails className="border border_color satoshi_medium">
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
