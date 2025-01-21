import React from "react";

const SalesBanner = ({ customize = {} }) => {
  return (
    <div style={customize} className="sale__banner__wrapper">
      <div className="sale__banner__gradient"></div>
      <div className="sale__banner__image"></div>
    </div>
  );
};

export default SalesBanner;
