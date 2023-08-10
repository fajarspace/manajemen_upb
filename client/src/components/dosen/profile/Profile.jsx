import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardPage from "../../../pages/DashboardPage";

const Profile = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmPassword, setkonfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [jafung, setJafung] = useState("");
  const [nidn, setNidn] = useState("");
  const [prodi, setProdi] = useState("");
  const [wa, setWa] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const urlById = `${baseUrl}/users/${id}`;

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(urlById);
        setNama(response.data.nama);
        setEmail(response.data.email);
        setRole(response.data.role);
        setWa(response.data.wa);
        setNidn(response.data.nidn);
        setJafung(response.data.jafung);
        setProdi(response.data.prodi);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(urlById, {
        nama: nama,
        email: email,
        password: password,
        konfirmPassword: konfirmPassword,
        role: role,
        wa: wa,
        nidn: nidn,
        jafung: jafung,
        prodi: prodi,
      });
      setSuccessMessage("Berhasil disimpan!"); // Set pesan berhasil
      setErrorMessage(""); // Reset pesan error
      navigate(`/profile/${id}`);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg); // Set pesan error
        setSuccessMessage(""); // Reset pesan berhasil
      }
    }
  };
  return (
    <DashboardPage>
      <div className="mobile-menu-overlay" />
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div className="page-header">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="title">
                    <h4>Profile</h4>
                  </div>
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/dashboard">Dashboard</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
                <div className="pd-20 card-box height-100-p">
                  <div className="profile-photo">
                    <a
                      href="modal"
                      data-toggle="modal"
                      data-target="#modal"
                      className="edit-avatar"
                    >
                      <i className="fa fa-pencil" />
                    </a>
                    <img
                      src="vendors/images/photo1.jpg"
                      alt=""
                      className="avatar-photo"
                    />
                    <div
                      className="modal fade"
                      id="modal"
                      tabIndex={-1}
                      role="dialog"
                      aria-labelledby="modalLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-body pd-5">
                            <div className="img-container">
                              <img
                                id="image"
                                src="vendors/images/photo2.jpg"
                                alt="Picture"
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <input
                              type="submit"
                              defaultValue="Update"
                              className="btn btn-dark"
                            />
                            <button
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="text-center h5 mb-0">{nama}</h5>
                  <p className="text-center text-muted font-14">{nidn}</p>
                  <div className="profile-info">
                    <h5 className="mb-20 h5 text-dark">Contact Information</h5>
                    <ul>
                      <li>
                        <span>Email Address:</span>
                        {email}
                      </li>
                      <li>
                        <span>Jabatan fungsional</span>
                        {jafung}
                      </li>
                      <li>
                        <span>No WA:</span>
                        {wa}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mb-30">
                <div className="card-box height-100-p overflow-hidden">
                  <div className="profile-tab height-100-p">
                    <div className="tab height-100-p">
                      <ul className="nav nav-tabs customtab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#setting"
                            role="tab"
                          >
                            Settings
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#akun"
                            role="tab"
                          >
                            Akun
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        {/* Setting Tab start */}
                        <div
                          className="tab-pane fade height-100-p show active"
                          id="setting"
                          role="tabpanel"
                        >
                          <div className="profile-setting">
                            <form onSubmit={updateUser}>
                              <ul className="profile-edit-list row">
                                <li className="weight-500 col-md-12">
                                  <h4 className="text-dark h5 mb-20">
                                    Edit Your Personal Setting
                                  </h4>
                                  <div className="form-group">
                                    <label>Nama Lengkap + Gelar</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="text"
                                      value={nama}
                                      onChange={(e) => setNama(e.target.value)}
                                      placeholder="Nama"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>NIDN</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="text"
                                      value={nidn}
                                      onChange={(e) => {
                                        const onlyNums = e.target.value.replace(
                                          /[^0-9]/g,
                                          ""
                                        ); // Hanya angka yang diterima
                                        setNidn(onlyNums);
                                      }}
                                      placeholder="NIDN"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Jabatan Fungsional</label>
                                    <select
                                      className="form-control form-control-lg"
                                      value={jafung}
                                      onChange={(e) =>
                                        setJafung(e.target.value)
                                      }
                                    >
                                      <option value="">Pilih Jabatan</option>
                                      <option value="Tidak">Tidak</option>
                                      <option value="Tenaga Pengajar">
                                        Tenaga Pengajar
                                      </option>
                                      <option value="Asisten Ahli">
                                        Asisten Ahli
                                      </option>
                                      <option value="Lektor">Lektor</option>
                                      <option value="Lektor Kepala">
                                        Lektor Kepala
                                      </option>
                                      <option value="Guru Besar">
                                        Guru Besar
                                      </option>
                                      {/* Tambahkan opsi jabatan lain sesuai kebutuhan */}
                                    </select>
                                  </div>

                                  {/* <div className="form-group">
                                    <label>Date of birth</label>
                                    <input
                                      className="form-control form-control-lg date-picker"
                                      type="text"
                                    />
                                  </div> */}

                                  <div className="form-group">
                                    <label>Prodi</label>
                                    <select
                                      className="form-control form-control-lg"
                                      value={prodi}
                                      onChange={(e) => setProdi(e.target.value)}
                                    >
                                      <option value="">Pilih Prodi</option>
                                      <option value="Teknik Industri">
                                        Teknik Industri
                                      </option>
                                      <option value="Teknik Informatika">
                                        Teknik Informatika
                                      </option>
                                      <option value="Teknik Kimia">
                                        Teknik Kimia
                                      </option>
                                      <option value="Teknik Lingkungan">
                                        Teknik Lingkungan
                                      </option>
                                      <option value="Teknik Sipil">
                                        Teknik Sipil
                                      </option>
                                      {/* Tambahkan opsi jabatan lain sesuai kebutuhan */}
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>No WA</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="text"
                                      value={wa}
                                      onChange={(e) => {
                                        const onlyNums = e.target.value.replace(
                                          /[^0-9]/g,
                                          ""
                                        ); // Hanya angka yang diterima
                                        setWa(onlyNums);
                                      }}
                                      placeholder="62xxxx"
                                    />
                                  </div>

                                  <div className="form-group">
                                    {/* <div className="custom-control custom-checkbox mb-5">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1-1"
                                      />
                                      <label
                                        className="custom-control-label weight-400"
                                        htmlFor="customCheck1-1"
                                      >
                                        I agree to receive notification emails
                                      </label>
                                    </div> */}
                                  </div>
                                  <div className="form-group mb-0">
                                    <input
                                      type="submit"
                                      className="btn btn-dark"
                                      defaultValue="Update Information"
                                    />
                                  </div>
                                  {successMessage && (
                                    <div className="alert alert-success mt-3">
                                      {successMessage}
                                    </div>
                                  )}
                                  {errorMessage && (
                                    <div className="alert alert-danger mt-3">
                                      {errorMessage}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </form>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade height-100-p"
                          id="akun"
                          role="tabpanel"
                        >
                          <div className="profile-setting">
                            <form onSubmit={updateUser}>
                              <ul className="profile-edit-list row">
                                <li className="weight-500 col-md-12">
                                  <div className="form-group">
                                    <label>Email</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      placeholder="Email"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      placeholder="******"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Ulangi Password</label>
                                    <input
                                      className="form-control form-control-lg"
                                      type="password"
                                      value={konfirmPassword}
                                      onChange={(e) =>
                                        setkonfirmPassword(e.target.value)
                                      }
                                      placeholder="******"
                                    />
                                  </div>

                                  <div className="form-group mb-0">
                                    <input
                                      type="submit"
                                      className="btn btn-dark"
                                      defaultValue="Update Information"
                                    />
                                  </div>
                                  {successMessage && (
                                    <div className="alert alert-success mt-3">
                                      {successMessage}
                                    </div>
                                  )}
                                  {errorMessage && (
                                    <div className="alert alert-danger mt-3">
                                      {errorMessage}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </form>
                          </div>
                        </div>
                        {/* Setting Tab End */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </DashboardPage>
  );
};

export default Profile;
