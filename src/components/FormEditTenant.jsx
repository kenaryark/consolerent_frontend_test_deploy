import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";

const FormEditTenant = () => {
  const { id } = useParams(); // Mendapatkan ID tenant dari URL
  const navigate = useNavigate();
  //   const { user } = useSelector((state) => state.auth); // Mendapatkan data user dari Redux

  const [tenant, setTenant] = useState(null);
  const [formValues, setFormValues] = useState({
    ongkir: "",
    jaminan: "",
    nama_tim: "",
    total_harga: "",
    waktu_pengiriman: "",
    status: "",
  });
  const [buktiTransaksiFile, setBuktiTransaksiFile] = useState(null);
  const [buktiTransaksiPreview, setBuktiTransaksiPreview] = useState(null);
  const [testimoniCustomerFile, setTestimoniCustomerFile] = useState(null);
  const [testimoniCustomerPreview, setTestimoniCustomerPreview] =
    useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tenants/${id}`
        );
        const data = response.data;
        setTenant(data);

        const currentTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const total = data.harga + (data.ongkir || 0);

        setFormValues({
          ongkir: data.ongkir,
          jaminan: data.jaminan,
          nama_tim: data.nama_tim,
          total_harga: total,
          waktu_pengiriman: currentTime,
          status: data.status,
        });

        if (data.bukti_transaksi) {
          setBuktiTransaksiPreview(data.bukti_transaksi);
        }
        if (data.testimoni_customer) {
          setTestimoniCustomerPreview(data.testimoni_customer);
        }
      } catch (error) {
        console.error("Failed to fetch tenant", error);
      }
    };

    fetchTenant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      let newTotal = prevValues.total_harga;
      if (name === "ongkir") {
        newTotal = tenant.harga + Number(value);
      }
      return {
        ...prevValues,
        [name]: value,
        total_harga: newTotal,
      };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "bukti_transaksi") {
      setBuktiTransaksiFile(files[0]);
      setBuktiTransaksiPreview(URL.createObjectURL(files[0]));
    } else if (name === "testimoni_customer") {
      setTestimoniCustomerFile(files[0]);
      setTestimoniCustomerPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ongkir", formValues.ongkir);
    formData.append("jaminan", formValues.jaminan);
    formData.append("nama_tim", formValues.nama_tim);
    formData.append("total_harga", formValues.total_harga);
    formData.append("waktu_pengiriman", formValues.waktu_pengiriman);
    formData.append("status", formValues.status);

    if (buktiTransaksiFile) {
      formData.append("bukti_transaksi", buktiTransaksiFile);
    }
    if (testimoniCustomerFile) {
      formData.append("testimoni_customer", testimoniCustomerFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tenants/${id}`,
        formData
      );

      if (response.status === 200) {
        alert("Data updated successfully!");
        navigate("/tenants");
      } else {
        console.error("Failed to update data:", response.data);
        alert("Failed to update data.");
      }
    } catch (error) {
      console.error("Failed to update tenant", error);
    }
  };

  return (
    <>
      {tenant ? (
        <div className="container">
          <button onClick={() => navigate(-1)} className="button is-info mb-5">
            <IoCaretBackCircle />
            Back
          </button>
          <h2 className="title">Update Data Penyewa</h2>
          <form onSubmit={handleSubmit}>
            {/* Menampilkan data yang tidak dapat diedit */}
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.nama}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Alamat</label>
              <div className="control">
                <textarea
                  value={tenant.alamat}
                  disabled
                  rows={4}
                  className="textarea is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Daerah Pengiriman</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.daerah_pengiriman}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">No Telp</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.no_telp}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Tipe Playstation</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.tipe_playstation}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Unit</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.unit}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Periode Sewa</label>
              <div className="control">
                <input
                  type="text"
                  value={tenant.periode_sewa}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Tanggal Sewa</label>
              <div className="control">
                <input
                  type="text"
                  value={new Date(tenant.tanggal_sewa).toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                  disabled
                  className="input is-static"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Item Tambahan</label>
              <div className="control">
                {tenant.item_tambahan ? (
                  <ul>
                    {Object.entries(JSON.parse(tenant.item_tambahan)).map(
                      ([key, value], index) => (
                        <li key={index}>
                          {typeof value === "object" ? (
                            <>
                              {value.nama}: {value.details} unit
                            </>
                          ) : (
                            value
                          )}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="input is-static">Tidak ada item tambahan</p>
                )}
              </div>
            </div>

            {/* Input yang bisa diubah */}
            <div className="field">
              <label className="label">Ongkir</label>
              <div className="control">
                <input
                  type="number"
                  name="ongkir"
                  value={formValues.ongkir}
                  onChange={handleChange}
                  className="input"
                  placeholder="Masukkan Ongkir"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis Jaminan</label>
              <div className="control">
                <input
                  type="text"
                  name="jaminan"
                  value={formValues.jaminan}
                  onChange={handleChange}
                  className="input"
                  placeholder="Masukkan Jenis Jaminan"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Nama Tim</label>
              <div className="control">
                <input
                  type="text"
                  name="nama_tim"
                  value={formValues.nama_tim}
                  onChange={handleChange}
                  className="input"
                  placeholder="Masukkan Nama Tim"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <div className="select">
                  <select
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                    className="input">
                    <option value="Selesai">Selesai</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Disewa">Disewa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Bukti Transaksi</label>
              <div className="control">
                {buktiTransaksiPreview ? (
                  <figure className="image is-4by3 mb-2">
                    <img
                      src={buktiTransaksiPreview}
                      alt="Bukti Transaksi Preview"
                    />
                  </figure>
                ) : null}
                {!tenant.bukti_transaksi && (
                  <input
                    type="file"
                    name="bukti_transaksi"
                    onChange={handleFileChange}
                    className="input"
                  />
                )}
              </div>
            </div>

            <div className="field">
              <label className="label">Testimoni Customer</label>
              <div className="control">
                {testimoniCustomerPreview ? (
                  <figure className="image is-4by3 mb-2">
                    <img
                      src={testimoniCustomerPreview}
                      alt="Testimoni Customer Preview"
                    />
                  </figure>
                ) : null}
                {!tenant.testimoni_customer && (
                  <input
                    type="file"
                    name="testimoni_customer"
                    onChange={handleFileChange}
                    className="input"
                  />
                )}
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary is-fullwidth">
                  Update Data
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default FormEditTenant;
