import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../app/authSlice";
import NavAdmin from "../components/dosen/layout/NavAdmin";
// import FooterAdmin from "../components/dosen/layout/FooterAdmin";
// import Aside from "../components/dosen/layout/Aside";
import Sidebar from "../components/dosen/layout/Sidebar";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);
  return (
    <>
      <NavAdmin />
      <Sidebar />
      {children}
    </>
  );
};

export default DashboardPage;
