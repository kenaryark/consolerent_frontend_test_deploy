import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";

const FormPayment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const formData = useMemo(() => state?.formData || {}, [state]); // Ambil formData dari state, atau objek kosong jika tidak ada
  const [token, setToken] = useState("");

  //   console.log("data di payment", formData);

  // Jika formData kosong, arahkan kembali ke halaman sebelumnya
  useEffect(() => {
    if (!formData.name) {
      navigate("/tenants/add");
    }
  }, [formData, navigate]);

  // const [lastOrderId, setLastOrderId] = useState(7);
  // const orderId = lastOrderId + 1;
  const process = async () => {
    const selectedItems = [
      formData.playstationType,
      formData.additionalItems.controller.selected
        ? formData.additionalItems.controller.name
        : "",
      formData.additionalItems.tv.selected
        ? formData.additionalItems.tv.name
        : "",
      formData.additionalItems.akun.selected
        ? formData.additionalItems.akun.name
        : "",
    ]
      .filter((item) => item !== "")
      .join(" + ");

    const dataPayment = {
      nama: formData.name,
      order_id: "order-104",
      total: formData.harga,
      no_telp: formData.phone,
      item: selectedItems,
      qty: formData.unit,
    };
    try {
      const response = await axios.post(
        "https://consolerentapideploytest-production.up.railway.app/api/process-transaction",
        dataPayment
      );

      const result = response.data;
      console.log(result);
      setToken(result.token);

      //   const result = await response.json();
      //   setToken(result.token);
      //   setLastOrderId(orderId);
    } catch (error) {
      console.error("Error:", error);
    }

    const data = {
      nama: formData.name,
      alamat: formData.address,
      no_telp: formData.phone,
      tipe_playstation: formData.playstationType,
      unit: formData.unit,
      periode_sewa: formData.rentalPeriod,
      harga: formData.harga,
      tanggal_sewa: formData.tanggal_sewa,
      daerah_pengiriman: formData.kelurahan,
      status: formData.status,
      jenis_pembayaran: formData.jenis_pembayaran,
      // Mengirim item tambahan yang dipilih
      ...(Object.keys(formData.additionalItems).some(
        (key) => formData.additionalItems[key].selected
      ) && {
        item_tambahan: {
          ...(formData.additionalItems.controller.selected && {
            controller: {
              nama: formData.additionalItems.controller.name,
              details: formData.additionalItems.controller.details,
            },
          }),
          ...(formData.additionalItems.tv.selected && {
            tv: {
              nama: formData.additionalItems.tv.name,
              details: formData.additionalItems.tv.details,
            },
          }),
          ...(formData.additionalItems.akun.selected && {
            akun: formData.additionalItems.akun.name,
          }),
        },
      }),
    };

    try {
      await axios.post(
        "https://consolerentapideploytest-production.up.railway.app/api/tenants",
        data
      );
      // navigate("/tenants");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-wJ_pLXueR21FUDe9";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="container mt-5">
      <button onClick={() => navigate(-1)} className="button is-info mb-5">
        <IoCaretBackCircle />
        Back
      </button>
      <h1 className="title">Pembayaran</h1>
      <div className="box">
        <h2 className="subtitle">Detail Sewa</h2>
        <div className="content">
          <p>
            <strong>Nama:</strong> {formData.name}
          </p>
          <p>
            <strong>Alamat:</strong> {formData.address}
          </p>
          <p>
            <strong>Nomor Telepon:</strong> {formData.phone}
          </p>
          <p>
            <strong>Tipe Playstation:</strong> {formData.playstationType}
          </p>
          <p>
            <strong>Jumlah Unit:</strong> {formData.unit}
          </p>
          <p>
            <strong>Periode Sewa:</strong> {formData.rentalPeriod}
          </p>
          <p>
            <strong>Item Tambahan:</strong>

            {formData.additionalItems.controller.selected ||
            formData.additionalItems.tv.selected ||
            formData.additionalItems.akun.selected ? (
              <ul>
                <>
                  {formData.additionalItems.controller.selected && (
                    <li>
                      {formData.additionalItems.controller.name} :{" "}
                      {formData.additionalItems.controller.details}
                    </li>
                  )}
                  {formData.additionalItems.tv.selected && (
                    <li>
                      {formData.additionalItems.tv.name} :{" "}
                      {formData.additionalItems.tv.details}
                    </li>
                  )}
                  {formData.additionalItems.akun.selected && (
                    <li>{formData.additionalItems.akun.name}</li>
                  )}
                </>
              </ul>
            ) : (
              <> Tidak Ada</>
            )}
          </p>
          <p>
            <strong>Tanggal Sewa:</strong> {formData.tanggal_sewa}
          </p>
          <p>
            <strong>Total Harga:</strong>{" "}
            {formData.harga.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div className="field">
          <div className="control">
            <button onClick={process} className="button is-success">
              Melanjutkan Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPayment;
