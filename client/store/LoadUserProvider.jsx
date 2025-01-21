"use client";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";

const LoadUserProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCurrentUser = () => dispatch(loadUser());
    loadCurrentUser();
  }, []);

  return <>{children}</>;
};

export default LoadUserProvider;
