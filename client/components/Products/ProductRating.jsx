"use client";
import React from "react";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductRating = ({ ratings, size = "medium" }) => {
  const options = {
    size: size,
    value: ratings,
    readOnly: true,
    precision: 0.5,
    icon: <FavoriteIcon fontSize={size} />,
    emptyIcon: <FavoriteBorderIcon fontSize={size} />,
  };

  return <Rating {...options} />;
};

export default ProductRating;