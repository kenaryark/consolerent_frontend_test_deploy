import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddTenant from "../components/FormAddTenant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from "axios";

const AddTenant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(getMe()).unwrap(); // Tunggu hingga getMe selesai
        // Fetch tenant data
        const response = await axios.get("http://localhost:5000/api/tenants");
        const tenants = response.data;

        // Check if all statuses are "Selesai" and match user uuid
        const allFinished = tenants.every(
          (tenant) =>
            tenant.status === "Selesai" && tenant.user_uuid === user.uuid
        );

        if (user.role !== "user" || allFinished) {
          navigate("/"); // Redirect if conditions are not met
        }
      } catch (error) {
        // Navigasi ke halaman login jika terjadi kesalahan
        navigate("/");
      }
    };

    fetchUserData();
  }, [dispatch, navigate, user]);

  // Jika masih dalam proses atau terjadi kesalahan, render loading state
  if (isError || !user) {
    return null; // atau loading spinner
  }
  return (
    <Layout>
      <FormAddTenant />
    </Layout>
  );
};

export default AddTenant;
