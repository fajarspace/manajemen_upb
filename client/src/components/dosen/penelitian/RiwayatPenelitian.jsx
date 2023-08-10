import React, { useState, useEffect } from "react";
import axios from "axios";

const usersUrl = process.env.REACT_APP_BASE_URL;
const yahahah = `${usersUrl}/users`;
const RiwayatPenelitian = () => {
  const [penelitianList, setPenelitianList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/penelitian")
      .then((response) => {
        setPenelitianList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="card-box pb-10">
        <div className="h5 pd-20 mb-0">Recent Patient</div>
        <table className="data-table table nowrap">
          <thead>
            <tr>
              <th className="table-plus">Judul penelitian</th>
              <th>Ketua</th>
              <th>Status</th>
              <th className="datatable-nosort">Actions</th>
            </tr>
          </thead>
          <tbody>
            {penelitianList.map((penelitian, index) => (
              <tr key={penelitian.uuid}>
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <img
                        src="vendors/images/photo4.jpg"
                        className="border-radius-100 shadow"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div className="txt">
                      <div className="weight-600">{penelitian.judul}</div>
                    </div>
                  </div>
                </td>
                <td>{penelitian.ketua}</td>

                <td>
                  <span
                    className={`badge badge-pill ${
                      penelitian.status === "Menunggu"
                        ? "badge-warning"
                        : penelitian.status === "Ditolak"
                        ? "badge-danger"
                        : "badge-success"
                    }`}
                  >
                    {penelitian.status}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <a href="#" data-color="#e95959">
                      <i className="icon-copy dw dw-eye" />
                    </a>
                    <a href="#" data-color="#265ed7">
                      <i className="icon-copy dw dw-delete-3" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RiwayatPenelitian;
