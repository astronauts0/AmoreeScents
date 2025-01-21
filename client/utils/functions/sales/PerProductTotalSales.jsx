import { clearErrors, perProductOrders } from "@/store/actions/orderAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PerProductTotalSales = ({ productId }) => {
  // Destructure productId from props
  const dispatch = useDispatch();
  const { loading, error, totalProductOrders } = useSelector(
    (state) => state.perProductOrders
  );

  const [productOrders, setProductOrders] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(perProductOrders());
  }, [dispatch, error]);

  useEffect(() => {
    if (productId && totalProductOrders) {
      const perProductOrders = totalProductOrders
        ?.map((item) => item.orderItems)
        .flat()
        .filter((item) => item.product === productId).length;
      setProductOrders(perProductOrders);
    }
  }, [productId, totalProductOrders]);

  return <span>{productOrders}</span>;
};

export default PerProductTotalSales;