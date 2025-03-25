import { clearErrors, perProductOrders } from "@/store/actions/orderAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PerProductTotalSales = ({ productId }) => {
  const dispatch = useDispatch();
  const { error, totalProductOrders } = useSelector(
    (state) => state.perProductOrders
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(perProductOrders(productId));
  }, [dispatch, error, productId]);

  return <span className="font-bold text-lg text-orange-300">{totalProductOrders}</span>;
};

export default PerProductTotalSales;