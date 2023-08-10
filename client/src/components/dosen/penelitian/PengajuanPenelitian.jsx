import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardPage from "../../../pages/DashboardPage";

const PenelitianForm = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [formData, setFormData] = useState({
    ketua: null,
    ketuaNidn: "",
    ketuaJafung: "",
    anggota1: "",
    anggota1Nidn: "",
    anggota1Jafung: "",
    anggota2: "",
    anggota2Nidn: "",
    anggota2Jafung: "",
    anggota3: "",
    anggota3Nidn: "",
    anggota3Jafung: "",
    anggota4: "",
    anggota4Nidn: "",
    anggota4Jafung: "",
    judul: null,
    status: "Menunggu",
    acc: "false",
    penelitianAkhir: null,
  });
  const [file, setFile] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // State
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      setDataUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKetuaChange = (event) => {
    const { value } = event.target;
    setShowWarning(false); // Set showWarning menjadi false setiap kali pilihan kelas berubah
    const selectedUser = dataUsers.find((user) => user.nama === value);
    const updatedFormData = {
      ...formData,
      ketua: value,
      ketuaNidn: selectedUser ? selectedUser.nidn : "",
      ketuaJafung: selectedUser ? selectedUser.jafung : "",
    };

    setFormData(updatedFormData);
  };

  const handleAnggotaChange = (event, anggotaNumber) => {
    const { name, value } = event.target;
    const anggotaNidnKey = `anggota${anggotaNumber}Nidn`;
    const anggotaJafungKey = `anggota${anggotaNumber}Jafung`;

    let updatedFormData = { ...formData, [name]: value };

    if (name === `anggota${anggotaNumber}`) {
      const selectedUser = dataUsers.find((user) => user.nama === value);
      if (selectedUser) {
        updatedFormData = {
          ...updatedFormData,
          [anggotaNidnKey]: selectedUser.nidn,
          [anggotaJafungKey]: selectedUser.jafung,
        };
      } else {
        updatedFormData = {
          ...updatedFormData,
          [anggotaNidnKey]: "",
          [anggotaJafungKey]: "",
        };
      }
    }

    setFormData(updatedFormData);
  };

  const filteredDataKetua = dataUsers.filter(
    (user) =>
      user.nama === formData.ketua && user.jafung === formData.ketuaJafung
  );
  const filteredDataAnggota1 = dataUsers.filter(
    (user) =>
      user.nama === formData.anggota1 && user.jafung === formData.anggota1Jafung
  );
  const filteredDataAnggota2 = dataUsers.filter(
    (user) =>
      user.nama === formData.anggota2 && user.jafung === formData.anggota2Jafung
  );
  const filteredDataAnggota3 = dataUsers.filter(
    (user) =>
      user.nama === formData.anggota3 && user.jafung === formData.anggota3Jafung
  );
  const filteredDataAnggota4 = dataUsers.filter(
    (user) =>
      user.nama === formData.anggota4 && user.jafung === formData.anggota4Jafung
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowWarning(false); // Set showWarning menjadi false setiap kali pilihan kelas berubah
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append("penelitianAkhir", file);
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }

    try {
      if (!formData.judul) {
        setShowWarning(true); // Set showWarning menjadi true jika kelas belum diisi
        return; // Berhenti eksekusi jika kelas belum diisi
      }
      const response = await axios.post(
        `${baseUrl}/penelitian`,
        formDataWithFile
      );
      console.log("Penelitian berhasil dibuat:", response.data);
      setSuccessMessage("Penelitian berhasil dibuat.");
      setErrorMessage("");
      // You can perform additional actions, like clearing the form or redirecting the user
    } catch (error) {
      console.error("Error creating penelitian:", error);
      setErrorMessage("Terjadi kesalahan saat membuat penelitian.");
      setSuccessMessage("");
    }
  };

  return (
    <DashboardPage>
      <div className="mobile-menu-overlay" />
      <div className="main-container">
        <div className="card-box pd-20 height-100-p mb-30 ">
          <form onSubmit={handleSubmit}>
            <div className="h5 pd-5 mb-10">Judul Penelitian</div>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  <input
                    className={`form-control ${
                      showWarning ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="judul"
                    value={formData.judul}
                    placeholder="Masukkan Judul"
                    onChange={handleInputChange}
                  />
                  {showWarning && (
                    <div className="invalid-feedback">Judul belum diisi!</div>
                  )}
                </div>
              </div>
            </div>

            <div className="h5 pd-5 mb-10">Ketua</div>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="namaUserSelect"
                    value={formData.ketua}
                    onChange={handleKetuaChange}
                  >
                    <option value="">Pilih ketua</option>
                    {dataUsers.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                  {showWarning && (
                    <div className="invalid-feedback">Ketua belum diisi!</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="nidnSelect"
                    value={formData.ketuaNidn}
                    onChange={(e) =>
                      setFormData({ ...formData, ketuaNidn: e.target.value })
                    }
                    disabled
                  >
                    {filteredDataKetua.map((user) => (
                      <option key={user.id} value={user.nidn}>
                        {user.nidn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="jafungSelect"
                    value={formData.ketuaJafung}
                    onChange={(e) =>
                      setFormData({ ...formData, ketuaJafung: e.target.value })
                    }
                    disabled
                  >
                    {filteredDataKetua.map((user) => (
                      <option key={user.id} value={user.jafung}>
                        {user.jafung}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="h5 pd-5 mb-10">Anggota</div>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  {/* Select for Anggota 1 */}
                  <select
                    className="custom-select"
                    id="anggota1Select"
                    name="anggota1"
                    value={formData.anggota1}
                    onChange={(e) => handleAnggotaChange(e, 1)}
                  >
                    <option value="">Pilih Anggota 1</option>
                    {dataUsers.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1NidnSelect"
                    name="anggota1Nidn"
                    value={formData.anggota1Nidn}
                    onChange={(e) => handleAnggotaChange(e, 1)}
                    disabled
                  >
                    {filteredDataAnggota1.map((user) => (
                      <option key={user.id} value={user.nidn}>
                        {user.nidn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1JafungSelect"
                    name="anggota1Jafung"
                    value={formData.anggota1Jafung}
                    onChange={(e) => handleAnggotaChange(e, 1)}
                    disabled
                  >
                    {filteredDataAnggota1.map((user) => (
                      <option key={user.id} value={user.jafung}>
                        {user.jafung}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  {/* Select for Anggota 2 */}
                  <select
                    className="custom-select"
                    id="anggota1Select"
                    name="anggota2"
                    value={formData.anggota2}
                    onChange={(e) => handleAnggotaChange(e, 2)}
                  >
                    <option value="">Pilih Anggota 2</option>
                    {dataUsers.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1NidnSelect"
                    name="anggota1Nidn"
                    value={formData.anggota2Nidn}
                    onChange={(e) => handleAnggotaChange(e, 2)}
                    disabled
                  >
                    {filteredDataAnggota2.map((user) => (
                      <option key={user.id} value={user.nidn}>
                        {user.nidn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1JafungSelect"
                    name="anggota1Jafung"
                    value={formData.anggota2Jafung}
                    onChange={(e) => handleAnggotaChange(e, 2)}
                    disabled
                  >
                    {filteredDataAnggota2.map((user) => (
                      <option key={user.id} value={user.jafung}>
                        {user.jafung}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  {/* Select for Anggota 3 */}
                  <select
                    className="custom-select"
                    id="anggota3Select"
                    name="anggota3"
                    value={formData.anggota3}
                    onChange={(e) => handleAnggotaChange(e, 3)}
                  >
                    <option value="">Pilih Anggota 3</option>
                    {dataUsers.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota3NidnSelect"
                    name="anggota3Nidn"
                    value={formData.anggota3Nidn}
                    onChange={(e) => handleAnggotaChange(e, 3)}
                    disabled
                  >
                    {filteredDataAnggota3.map((user) => (
                      <option key={user.id} value={user.nidn}>
                        {user.nidn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1JafungSelect"
                    name="anggota1Jafung"
                    value={formData.anggota3Jafung}
                    onChange={(e) => handleAnggotaChange(e, 3)}
                    disabled
                  >
                    {filteredDataAnggota3.map((user) => (
                      <option key={user.id} value={user.jafung}>
                        {user.jafung}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  {/* Select for Anggota 4 */}
                  <select
                    className="custom-select"
                    id="anggota4Select"
                    name="anggota4"
                    value={formData.anggota4}
                    onChange={(e) => handleAnggotaChange(e, 4)}
                  >
                    <option value="">Pilih Anggota 4</option>
                    {dataUsers.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota4NidnSelect"
                    name="anggota4Nidn"
                    value={formData.anggota4Nidn}
                    onChange={(e) => handleAnggotaChange(e, 4)}
                    disabled
                  >
                    {filteredDataAnggota4.map((user) => (
                      <option key={user.id} value={user.nidn}>
                        {user.nidn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <select
                    className="custom-select"
                    id="anggota1JafungSelect"
                    name="anggota1Jafung"
                    value={formData.anggota4Jafung}
                    onChange={(e) => handleAnggotaChange(e, 4)}
                    disabled
                  >
                    {filteredDataAnggota4.map((user) => (
                      <option key={user.id} value={user.jafung}>
                        {user.jafung}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="h5 pd-5 mb-10">Upload laporan akhir penelitian</div>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <input
                    type="file"
                    name="penelitianAkhir"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-dark" type="submit">
              Submit
            </button>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </DashboardPage>
  );
};

export default PenelitianForm;
