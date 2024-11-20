import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const TenantList = () => {
  const { user } = useSelector((state) => state.auth);
  const [tenants, setTenants] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = async () => {
    const response = await axios.get("http://localhost:5000/api/tenants");
    setTenants(response.data);
  };

  const deleteTenant = async (tenantId) => {
    await axios.delete(`http://localhost:5000/api/tenants/${tenantId}`);
    getTenants();
  };

  const renderAdditionalItems = (item_tambahan) => {
    if (
      !item_tambahan ||
      item_tambahan === "null" ||
      item_tambahan.trim() === ""
    ) {
      return <>Tidak Ada</>;
    }

    try {
      const items = JSON.parse(item_tambahan);
      return (
        <ul className="list-disc pl-5">
          {Object.keys(items).length > 0
            ? Object.keys(items).map((key) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {items[key].details}{" "}
                  {key.toLowerCase().includes("akun")
                    ? "Playstation Plus"
                    : "unit"}
                </li>
              ))
            : null}
        </ul>
      );
    } catch (error) {
      return <span>Error parsing additional items</span>;
    }
  };

  // Filter tenants only if user role is "user"
  const filteredTenants =
    user && user.role === "user"
      ? showHistory
        ? tenants.filter((tenant) => tenant.status === "Selesai")
        : tenants.filter((tenant) => tenant.status !== "Selesai")
      : tenants;

  // Check if all tenants have "Selesai" status for "user" role
  const allStatusSelesai =
    user && user.role === "user"
      ? tenants.every((tenant) => tenant.status === "Selesai")
      : false;

  return (
    <div>
      <h1 className="title">Sewa</h1>
      <h2 className="subtitle">Data Sewa</h2>
      {/* {user && user.role === "user" && (
        <>
          <Link to="/tenants/add" className="button is-primary mb-2">
            Sewa Playstation
          </Link>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="button is-secondary mb-2 ml-2">
            {showHistory ? "Tampilkan Semua" : "Tampilkan History"}
          </button>
        </>
      )} */}
      {/* Show the "Sewa Playstation" button only if there is a tenant with status other than "Selesai" */}
      {user && user.role === "user" && allStatusSelesai && (
        <Link to="/tenants/add" className="button is-primary mb-2">
          Sewa Playstation
        </Link>
      )}

      {user && user.role === "user" && (
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="button is-secondary mb-2 ml-2">
          {showHistory ? "Tampilkan Sewa" : "Tampilkan Riwayat"}
        </button>
      )}

      <div className="table-container">
        <table className="table is-striped">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">No</th>
              <th className="py-3 px-4 border-b">Nama</th>
              <th className="py-3 px-4 border-b">Tipe Playstation</th>
              <th className="py-3 px-4 border-b">Jumlah Unit</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Periode Sewa</th>
              <th className="py-3 px-4 border-b">Harga</th>
              <th className="py-3 px-4 border-b">Item Tambahan</th>
              <th className="py-3 px-4 border-b">Tanggal Sewa</th>

              {user && user.role === "admin" && (
                <>
                  <th className="py-3 px-4 border-b">Alamat</th>
                  <th className="py-3 px-4 border-b">No Telp</th>
                  <th className="py-3 px-4 border-b">Daerah Pengiriman</th>
                  <th className="py-3 px-4 border-b">Ongkir</th>
                  <th className="py-3 px-4 border-b">Total Harga</th>
                  <th className="py-3 px-4 border-b">Jenis Pembayaran</th>
                  <th className="py-3 px-4 border-b">Jaminan</th>
                  <th className="py-3 px-4 border-b">Nama Tim</th>
                  <th className="py-3 px-4 border-b">Waktu Pengiriman</th>
                  <th className="py-3 px-4 border-b">Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant, index) => (
              <tr key={tenant.uuid}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">{tenant.nama}</td>
                <td className="py-2 px-4 border-b">
                  {tenant.tipe_playstation}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {tenant.unit}
                </td>
                <td className="py-2 px-4 border-b">{tenant.status || "N/A"}</td>
                <td className="py-2 px-4 border-b">{tenant.periode_sewa}</td>
                <td className="py-2 px-4 border-b">
                  {tenant.harga
                    ? tenant.harga.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {renderAdditionalItems(tenant.item_tambahan)}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(tenant.tanggal_sewa).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                {user && user.role === "admin" && (
                  <>
                    <td className="py-2 px-4 border-b">{tenant.alamat}</td>
                    <td className="py-2 px-4 border-b">{tenant.no_telp}</td>
                    <td className="py-2 px-4 border-b">
                      {tenant.daerah_pengiriman}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tenant.ongkir
                        ? tenant.ongkir.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {/* {tenant.total_harga || "N/A"} */}
                      {tenant.total_harga
                        ? tenant.total_harga.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tenant.jenis_pembayaran || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tenant.jaminan || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tenant.nama_tim || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {tenant.waktu_pengiriman || "N/A"}
                    </td>
                    <td>
                      <Link
                        to={`/tenants/edit/${tenant.uuid}`}
                        className="button is-small is-info">
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTenant(tenant.uuid)}
                        className="button is-small is-danger">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantList;
