import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../../app/authSlice";

function NavAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="menu-icon bi bi-list" />
          <div
            className="search-toggle-icon bi bi-search"
            data-toggle="header_search"
          />
          <div className="header-search">
            <form>
              <div className="form-group mb-0">
                <i className="dw dw-search2 search-icon" />
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search Here"
                />
                <div className="dropdown">
                  <a
                    className="dropdown-toggle no-arrow"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <i className="ion-arrow-down-c" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="form-group row">
                      <label className="col-sm-12 col-md-2 col-form-label">
                        From
                      </label>
                      <div className="col-sm-12 col-md-10">
                        <input
                          className="form-control form-control-sm form-control-line"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-12 col-md-2 col-form-label">
                        To
                      </label>
                      <div className="col-sm-12 col-md-10">
                        <input
                          className="form-control form-control-sm form-control-line"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-12 col-md-2 col-form-label">
                        Subject
                      </label>
                      <div className="col-sm-12 col-md-10">
                        <input
                          className="form-control form-control-sm form-control-line"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="btn btn-primary">Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="header-right">
          <div className="dashboard-setting user-notification">
            <div className="dropdown">
              <a
                className="dropdown-toggle no-arrow"
                href=""
                data-toggle="right-sidebar"
              >
                <i className="dw dw-settings2" />
              </a>
            </div>
          </div>
          <div className="user-notification">
            <div className="dropdown">
              <a
                className="dropdown-toggle no-arrow"
                href="#"
                role="button"
                data-toggle="dropdown"
              >
                <i className="icon-copy dw dw-notification" />
                <span className="badge notification-active" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="notification-list mx-h-350 customscroll">
                  <ul>
                    <li>
                      <a href="#">
                        <img src="vendors/images/photo3.jpg" alt="" />
                        <h3>John Doe</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed...
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="vendors/images/photo4.jpg" alt="" />
                        <h3>Renee I. Hansen</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed...
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="user-info-dropdown">
            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
              >
                <span className="user-icon">
                  <img src="vendors/images/photo1.jpg" alt="" />
                </span>
                <span className="user-name">{user && user.nama}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                <a
                  className="dropdown-item"
                  href={`/profile/${user && user.uuid}`}
                >
                  <i className="dw dw-user1" /> Profile
                </a>
                <Link className="dropdown-item" onClick={logout} to={"/"}>
                  <i className="dw dw-logout" /> Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavAdmin;
