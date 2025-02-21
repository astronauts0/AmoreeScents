"use client";

import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { PlusOneOutlined } from "@mui/icons-material";
import ShipInfo from "./shipping/ShipInfo";

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
        <AccordionDetails className="border border_color neue_machina_regular">
          <ShipInfo/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
