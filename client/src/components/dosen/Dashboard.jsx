import React, { useState, useEffect } from "react";
import DashboardPage from "../../pages/DashboardPage";
import { useSelector } from "react-redux";
import RiwayatPenelitian from "./penelitian/RiwayatPenelitian";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [greeting, setGreeting] = useState("");
  // const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Selamat pagi");
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting("Selamat siang");
    } else if (currentHour >= 16 && currentHour < 19) {
      setGreeting("Selamat sore");
    } else {
      setGreeting("Selamat malam");
    }
  }, []);

  const calculateCompletion = () => {
    let totalFields = 6; // Total jumlah data (nama, nidn, jafung, prodi)
    let completedFields = 0;

    if (user.nama) completedFields++;
    if (user.email) completedFields++;
    if (user.nidn) completedFields++;
    if (user.jafung) completedFields++;
    if (user.prodi) completedFields++;
    if (user.wa) completedFields++;

    return (completedFields / totalFields) * 100;
  };
  return (
    <DashboardPage>
      <div className="mobile-menu-overlay" />
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          {user && (
            <div className="card-box pd-20 height-100-p mb-30">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img src="vendors/images/banner-img.png" alt="" />
                </div>
                <div className="col-md-8">
                  <h4 className="font-20 weight-500 mb-10 text-capitalize">
                    <div className="weight-600 font-30 text-dark">
                      <span className="text-secondary weight-500">
                        {greeting},
                      </span>
                      <br /> {user.nama}
                    </div>
                  </h4>
                  {/* Conditionally render "Lengkapi profil anda" */}
                  {(!user.nama ||
                    !user.email ||
                    !user.nidn ||
                    !user.jafung ||
                    !user.prodi ||
                    !user.wa) && (
                    <div className="alert alert-warning" role="alert">
                      Lengkapi profil anda!
                      {/* Progress bar */}
                      <div
                        className="progress mb-10"
                        style={{ height: "25px" }}
                      >
                        <div
                          className="progress-bar bg-dark progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: `${calculateCompletion()}%` }}
                          aria-valuenow={calculateCompletion()}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {calculateCompletion().toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="row pb-10">
            <div className="col-xl-6 col-lg-3 col-md-6 mb-20">
              <div className="card-box height-100-p widget-style3">
                <a href="/pengajuan/penelitian" className="d-flex flex-wrap">
                  <div className="widget-data">
                    <div className="weight-700 font-24 text-dark">
                      Surat Rekomendasi Penelitian
                    </div>
                    <div className="font-14 text-secondary weight-500">
                      Pengajuan Rekomendasi Prodi
                    </div>
                  </div>
                  <div className="widget-icon">
                    <div className="icon">
                      <i className="icon-copy fa fa-plus" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-3 col-md-6 mb-20">
              <div className="card-box height-100-p widget-style3">
                <a href="/pengajuan/penelitian" className="d-flex flex-wrap">
                  <div className="widget-data">
                    <div className="weight-700 font-24 text-dark">
                      Surat Rekomendasi Pengabdian
                    </div>
                    <div className="font-14 text-secondary weight-500">
                      Pengajuan Rekomendasi Prodi
                    </div>
                  </div>
                  <div className="widget-icon">
                    <div className="icon">
                      <i className="icon-copy fa fa-plus" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <RiwayatPenelitian />

          <br />
        </div>
      </div>
    </DashboardPage>
  );
}

export default Dashboard;
