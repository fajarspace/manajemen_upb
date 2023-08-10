import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmPassword, setkonfirmPassword] = useState("");
  const [role, setRole] = useState("dosen");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseUrl + "/users", {
        nama: nama,
        email: email,
        password: password,
        konfirmPassword: konfirmPassword,
        role: role,
      });
      setSuccessMessage("Register berhasil! Silahkan Login"); // Set pesan berhasil
      setErrorMessage(""); // Reset pesan error
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg); // Set pesan error
        setSuccessMessage(""); // Reset pesan berhasil
      }
    }
  };

  return (
    <>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src="vendors/images/login-page-img.png" alt="" />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-dark">Register</h2>
                </div>

                <form onSubmit={saveUser}>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Nama Lengkap + Gelar"
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password*"
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="dw dw-padlock1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      value={konfirmPassword}
                      onChange={(e) => setkonfirmPassword(e.target.value)}
                      placeholder="Konfirmasi Password"
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="dw dw-padlock1" />
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Role"
                      disabled
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Register
                        </button>
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
                    </div>
                  </div>
                  <div className="row pb-30 mt-3">
                    <div className="col-12">
                      Sudah punya akun? <a href="/login">Login</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
