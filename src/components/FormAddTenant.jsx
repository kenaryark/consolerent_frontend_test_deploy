import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCaretBackCircle } from "react-icons/io5";

const FormAddTenant = () => {
  const navigate = useNavigate();
  const [kotaList, setKotaList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [selectedKota, setSelectedKota] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    playstationType: "PS4",
    unit: 1,
    rentalPeriod: "1 hari",
    additionalItems: {
      controller: { selected: false, name: "Controller", details: "" },
      tv: { selected: false, name: "TV", details: "" },
      akun: { selected: false, name: "Akun Playstation Plus" },
    },
    tanggal_sewa: "",
    harga: "",
    kelurahan: "",
    status: "",
    jenis_pembayaran: "",
  });

  let priceRental = 0;
  priceRental +=
    formData.playstationType === "PS4"
      ? formData.rentalPeriod === "12 jam"
        ? 60000
        : formData.rentalPeriod === "1 hari"
        ? 120000
        : formData.rentalPeriod === "2 hari"
        ? 240000
        : formData.rentalPeriod === "3 hari"
        ? 300000
        : formData.rentalPeriod === "5 hari"
        ? 540000
        : formData.rentalPeriod === "7 hari"
        ? 650000
        : 0
      : formData.playstationType === "PS5"
      ? formData.rentalPeriod === "12 jam"
        ? 150000
        : formData.rentalPeriod === "1 hari"
        ? 300000
        : formData.rentalPeriod === "2 hari"
        ? 600000
        : formData.rentalPeriod === "3 hari"
        ? 750000
        : formData.rentalPeriod === "5 hari"
        ? 1050000
        : formData.rentalPeriod === "7 hari"
        ? 1600000
        : 0
      : 0;
  let addItemPrice = 0;
  let rentalTime =
    formData.rentalPeriod === "12 jam"
      ? 1
      : formData.rentalPeriod === "1 hari"
      ? 1
      : formData.rentalPeriod === "2 hari"
      ? 2
      : formData.rentalPeriod === "3 hari"
      ? 3
      : formData.rentalPeriod === "5 hari"
      ? 5
      : formData.rentalPeriod === "7 hari"
      ? 7
      : 0;
  addItemPrice += formData.additionalItems.tv.selected
    ? 50000 * formData.additionalItems.tv.details * rentalTime
    : 0;

  addItemPrice += formData.additionalItems.akun.selected
    ? 15000 * rentalTime
    : 0;

  addItemPrice += formData.additionalItems.controller.selected
    ? formData.playstationType === "PS4"
      ? 20000 * formData.additionalItems.controller.details * rentalTime
      : formData.playstationType === "PS5"
      ? 50000 * formData.additionalItems.controller.details * rentalTime
      : 0
    : 0;

  const totalPrice = priceRental * formData.unit + addItemPrice;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      additionalItems: {
        ...prevState.additionalItems,
        [name]: {
          ...prevState.additionalItems[name],
          selected: checked,
          details: checked ? prevState.additionalItems[name].details : "", // Mengosongkan details jika checkbox tidak dipilih
        },
      },
    }));
  };

  const handleAdditionalDetailsChange = (e, item) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      additionalItems: {
        ...formData.additionalItems,
        [item]: { ...formData.additionalItems[item], details: value },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.harga = totalPrice;
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
    if (formData.jenis_pembayaran === "transfer") {
      //   navigate("/"); // Arahkan ke halaman pembayaran
      navigate("/payment", { state: { formData } });
    } else if (formData.jenis_pembayaran === "langsung") {
      try {
        await axios.post(
          "https://consolerentapideploytest-production.up.railway.app/api/tenants",
          data
        );
        navigate("/tenants");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Fetch Kecamatan berdasarkan provinsi/kabupaten
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch kecamatan from multiple APIs
        const [kotaResponse1, kotaResponse2] = await Promise.all([
          fetch(
            "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/31.json"
          ), // Example API endpoint
          fetch(
            "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/32.json"
          ),
        ]);

        const [kotaData1, kotaData2] = await Promise.all([
          kotaResponse1.json(),
          kotaResponse2.json(),
        ]);

        const filteredKota = [...kotaData1, ...kotaData2].filter((kota) =>
          [
            "KOTA JAKARTA TIMUR",
            "KOTA JAKARTA SELATAN",
            "KOTA JAKARTA UTARA",
            "KOTA JAKARTA BARAT",
            "KOTA JAKARTA PUSAT",
            "KOTA BOGOR",
          ].includes(kota.name.toUpperCase())
        );

        setKotaList(filteredKota); // Combine data from multiple sources
      } catch (error) {
        console.error("Error fetching kecamatan data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchKecamatan = async () => {
      if (selectedKota) {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKota}.json`
          );
          const data = await response.json();
          setKecamatanList(data);
        } catch (error) {
          console.error("Error fetching kelurahan data:", error);
        }
      }
    };

    fetchKecamatan();
  }, [selectedKota]);

  // Fetch Kelurahan berdasarkan kecamatan yang dipilih
  useEffect(() => {
    const fetchKelurahan = async () => {
      if (selectedKecamatan) {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`
          );
          const data = await response.json();
          setKelurahanList(data);
        } catch (error) {
          console.error("Error fetching kelurahan data:", error);
        }
      }
    };

    fetchKelurahan();
  }, [selectedKecamatan]);

  const handleKotaChange = (e) => {
    // const selectedKota = e.target.value;
    setSelectedKota(e.target.value);
    setKecamatanList([]);
    setKelurahanList([]);
    // Do not update formData.kecamatan
    setFormData({
      ...formData,
      kelurahan: "", // Reset kelurahan saat kecamatan berubah
    });
  };

  const handleKecamatanChange = (e) => {
    setSelectedKecamatan(e.target.value);
    // Do not update formData.kecamatan
    setFormData({
      ...formData,
      kelurahan: "", // Reset kelurahan saat kecamatan berubah
    });
  };

  // Menyimpan nama kelurahan
  const handleKelurahanChange = (e) => {
    setFormData({
      ...formData,
      kelurahan: e.target.value,
    });
  };

  const handleRadioChange = (e) => {
    // setSelectedValue(event.target.value);
    setFormData({
      ...formData,
      jenis_pembayaran: e.target.value,

      status: "Diproses",
      // e.target.value === "langsung" ? "Diproses" : "Menunggu Konfirmasi",
    });
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="button is-info mb-5">
        <IoCaretBackCircle />
        Back
      </button>
      <h1 className="title">Form Sewa</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                  <input
                    name="name"
                    type="text"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukan Nama"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat Lengkap</label>
                <div className="control">
                  <textarea
                    name="address"
                    className="input w-full p-3 border rounded"
                    style={{ width: "100vw", height: "15vh", resize: "none" }}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Masukan Alamat"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kota</label>
                <div className="control">
                  <select
                    className="input"
                    value={formData.kota}
                    onChange={handleKotaChange}
                    required>
                    <option value="">Pilih Kota</option>
                    {kotaList.map((kota) => (
                      <option key={kota.id} value={kota.id}>
                        {kota.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Kecamatan</label>
                <div className="control">
                  <select
                    className="input"
                    value={formData.kecamatan}
                    onChange={handleKecamatanChange}
                    required>
                    <option value="">Pilih Kecamatan</option>
                    {kecamatanList.map((kecamatan) => (
                      <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Kelurahan</label>
                <div className="control">
                  <select
                    className="input"
                    value={formData.kelurahan}
                    onChange={handleKelurahanChange}
                    required>
                    <option value="">Pilih Kelurahan</option>
                    {kelurahanList.map((kelurahan) => (
                      <option key={kelurahan.id} value={kelurahan.name}>
                        {kelurahan.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">No Telepon</label>
                <div className="control">
                  <input
                    name="phone"
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={(e) => {
                      // Hanya memperbolehkan angka
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({
                        ...formData,
                        phone: value,
                      });
                    }}
                    pattern="[0-9]*" // Membatasi input hanya angka
                    minLength={11} // Minimal 11 digit
                    maxLength={15} // Opsional, batas maksimum panjang digit
                    placeholder="Masukan Nomor Telepon"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Sewa</label>
                <div className="control">
                  <input
                    type="date"
                    id="tanggal_sewa"
                    name="tanggal_sewa"
                    className="input"
                    value={formData.tanggal_sewa}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Membatasi input hanya setelah hari ini
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Playstation</label>
                <div className="control">
                  <select
                    className="input"
                    name="playstationType"
                    value={formData.playstationType}
                    onChange={handleChange}
                    required>
                    {/* <option value="">Pilih Jenis Playstation</option> */}

                    <option value="PS4">PlayStation 4</option>
                    <option value="PS5">PlayStation 5</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Jumlah Unit</label>
                <div className="control">
                  <input
                    name="unit"
                    type="number"
                    className="input"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Masukan Jumlah Unit"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Periode Sewa</label>
                <div className="control">
                  <select
                    name="rentalPeriod"
                    className="input"
                    value={formData.rentalPeriod}
                    onChange={handleChange}
                    required>
                    {/* <option value="">Pilih Periode Sewa</option> */}
                    <option value="12 jam">12 jam</option>
                    <option value="1 hari">1 hari</option>
                    <option value="2 hari">2 hari</option>
                    <option value="3 hari">3 hari</option>
                    <option value="5 hari">5 hari</option>
                    <option value="7 hari">7 hari</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="control">Pilih Metode Pembayaran</label>
                <div className="radios">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      className="mr-2"
                      checked={formData.jenis_pembayaran === "transfer"}
                      onChange={handleRadioChange}
                      required
                    />
                    Transfer/QRIS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="langsung"
                      className="mr-2"
                      checked={formData.jenis_pembayaran === "langsung"}
                      onChange={handleRadioChange}
                      required
                    />
                    Langsung
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="control">Item Tambahan</label>
                <div className="checkboxes">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="akun"
                      className="mr-2"
                      checked={formData.additionalItems.akun.selected}
                      onChange={handleCheckboxChange}
                    />
                    Akun PlayStation Plus
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="controller"
                      className="mr-2"
                      checked={formData.additionalItems.controller.selected}
                      onChange={handleCheckboxChange}
                    />
                    Controller
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="tv"
                      className="mr-2"
                      checked={formData.additionalItems.tv.selected}
                      onChange={handleCheckboxChange}
                    />
                    TV
                  </label>
                </div>
                {formData.additionalItems.controller.selected && (
                  <div className="field">
                    <label className="label">Jumlah Controler</label>
                    <div className="control">
                      <input
                        type="number"
                        className="input"
                        name="controllerDetails"
                        value={formData.additionalItems.controller.details}
                        onChange={(e) =>
                          handleAdditionalDetailsChange(e, "controller")
                        }
                        min="1"
                        required
                        placeholder="Masukan Jumlah Controller"
                      />
                    </div>
                  </div>
                )}
                {formData.additionalItems.tv.selected && (
                  <div className="field">
                    <label className="label">Jumlah TV</label>
                    <div className="control">
                      <input
                        name="tvDetails"
                        type="number"
                        className="input"
                        value={formData.additionalItems.tv.details}
                        onChange={(e) => handleAdditionalDetailsChange(e, "tv")}
                        min="1"
                        required
                        placeholder="Masukan Jumlah TV"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Tambah
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddTenant;
