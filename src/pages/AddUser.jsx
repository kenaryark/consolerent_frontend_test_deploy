import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddUser from "../components/FormAddUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(getMe()).unwrap(); // Tunggu hingga getMe selesai
      } catch (error) {
        // Navigasi ke halaman login jika terjadi kesalahan
        navigate("/");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  // Jika masih dalam proses atau terjadi kesalahan, render loading state
  if (isError || !user) {
    return null; // atau loading spinner
  }
  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default AddUser;