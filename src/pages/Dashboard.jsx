import React from "react";
import Layout from "./Layout";
// import Welcome from "../components/Welcome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";
import playstationPlus from "../assets/images/playstation plus.png";
import playstation4 from "../assets/images/PlayStation_4_2.jpg";
import playstation5 from "../assets/images/ps5.png";
import playstationController from "../assets/images/PS4-PS5-Controller-678x381.jpg";
import tv from "../assets/images/tv29inch.jpeg";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSewa = () => {
    navigate("/tenants/add");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <section
        id="page-top"
        className="hero is-primary is-bold py-6"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="hero-body has-text-centered">
          <div className="container">
            <h1 className="title is-1 mb-4">
              The Next Level of Playing Console
            </h1>
            <p className="subtitle is-4 mb-6">
              Nikmati pengalaman bermain game favorit Anda di rumah dengan
              layanan rental kami.
            </p>
            <button
              onClick={() => {
                if (user && user.role === "admin") {
                  // Tidak melakukan apa-apa jika user adalah admin
                  return;
                }
                user ? handleSewa() : handleLogin();
              }}
              className="button is-primary is-inverted is-outlined is-medium">
              Sewa Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container has-text-centered">
          <h2 className="title is-2 mb-6">Kenapa Memilih Kami?</h2>
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="box is-flex is-flex-direction-column is-align-items-stretch">
                <h3 className="title is-4">Harga Terjangkau</h3>
                <p>Harga sewa yang kompetitif untuk semua kalangan.</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box is-flex is-flex-direction-column is-align-items-stretch">
                <h3 className="title is-4">Layanan Terpercaya</h3>
                <p>Pengantaran sampai tujuan dan aman.</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box is-flex is-flex-direction-column is-align-items-stretch">
                <h3 className="title is-4">Kualitas Terbaik</h3>
                <p>Unit PlayStation terbaru dengan banyak game pilihan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section has-background-dark">
        <div className="container has-text-centered">
          <h2 className="title is-2 mb-6">Harga Sewa</h2>
          <div className="columns">
            <div className="column is-half">
              <div className="box is-flex is-flex-direction-column is-align-items-stretch">
                <figure className="image is-200x200 mb-4">
                  <img
                    src={playstation4}
                    alt="Playstation 4"
                    className="image is-4by3"
                  />
                </figure>
                <h3 className="title is-4">Playstation 4</h3>
                <p className="subtitle is-4">Rp 120.000/hari*</p>
              </div>
            </div>
            <div className="column is-half">
              <div className="box is-flex is-flex-direction-column is-align-items-stretch">
                <figure className="image is-200x200 mb-4">
                  <img
                    src={playstation5}
                    alt="Playstation 5"
                    className="image is-4by3"
                  />
                </figure>
                <h3 className="title is-4">Playstation 5</h3>
                <p className="subtitle is-4">Rp 200.000/hari*</p>
              </div>
            </div>
          </div>
          <p className="subtitle is-5">*Belum termasuk biaya ongkos kirim</p>
        </div>
      </section>

      {/* Additional Sewa Section */}
      <section
        id="additional-sewa"
        className="section has-background-black-bis">
        <div className="container has-text-centered">
          <h2 className="title is-2 mb-6">Tambahan Item</h2>
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="box">
                <figure className="image is-200x200 mb-4">
                  <img
                    src={playstationController}
                    alt="PS Controllers"
                    className="image is-4by3"
                  />
                </figure>
                <h3 className="title is-4">+1 Stik PS 4</h3>
                <p className="subtitle is-4">Rp 20.000/hari</p>
                <h3 className="title is-4">+1 Stik PS 5</h3>
                <p className="subtitle is-4">Rp 50.000/hari</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <figure className="image is-200x200 mb-4">
                  <img src={tv} alt="TV 29 Inch" className="image is-4by3" />
                </figure>
                <h3 className="title is-4">TV 29 Inch</h3>
                <p className="subtitle is-4">Rp 50.000/hari</p>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="box">
                <figure className="image is-200x200 mb-4">
                  <img
                    src={playstationPlus}
                    alt="Playstation Plus"
                    className="image is-4by3"
                  />
                </figure>
                <h3 className="title is-4">Akun Playstation Plus</h3>
                <p className="subtitle is-4">Rp 50.000/hari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section id="address" className="section has-background-black-ter">
        <div className="container has-text-centered">
          <h2 className="title is-2 mb-6">Alamat</h2>
          <div className="columns">
            <div className="column">
              <div className="box">
                <h3 className="title is-4 mb-4">Cabang Jakarta</h3>
                <iframe
                  title="Map Cabang Jakarta"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4144989356173!2d106.8555277!3d-6.3403262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec52e9a59cf3%3A0xf41fe850ff216bc6!2sJl.%20Kenanga%201%20No.59%2C%20RT.2%2FRW.2%2C%20Kalisari%2C%20Kec.%20Ps.%20Rebo%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013790!5e0!3m2!1sid!2sid!4v1724040955295!5m2!1sid!2sid"
                  className="has-ratio"
                  //   style={{ width: "100%", height: "300px", border: 0 }}
                  width="100%"
                  height="300vh"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <h3 className="title is-4 mb-4">Cabang Bogor</h3>
                <iframe
                  title="Map Cabang Bogor"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.7387932406898!2d106.78064430205183!3d-6.652478682609101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf0d97f28125%3A0x53eacc3cb8d3823!2sJl.%20Kp.%20Cipinang%20Gading%2C%20RT.03%2FRW.01%2C%20Mulyaharja%2C%20Kec.%20Bogor%20Sel.%2C%20Kota%20Bogor%2C%20Jawa%20Barat%2016135!5e0!3m2!1sid!2sid!4v1724041415916!5m2!1sid!2sid"
                  className="has-ratio"
                  //   style={{ width: "100%", height: "300px", border: 0 }}
                  width="100%"
                  height="300vh"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
