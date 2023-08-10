const Sidebar = () => {
  return (
    <>
      <div className="right-sidebar">
        <div className="sidebar-title">
          <h3 className="weight-600 font-16 text-blue">
            Layout Settings
            <span className="btn-block font-weight-400 font-12">
              User Interface Settings
            </span>
          </h3>
          <div className="close-sidebar" data-toggle="right-sidebar-close">
            <i className="icon-copy ion-close-round" />
          </div>
        </div>
      </div>
      <div className="left-side-bar">
        <div className="brand-logo">
          <a href="/dashboard">
            <img
              src="vendors/images/deskapp-logo.svg"
              alt=""
              className="dark-logo"
            />
            <img
              src="vendors/images/deskapp-logo-white.svg"
              alt=""
              className="light-logo"
            />
          </a>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round" />
          </div>
        </div>
        <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <li>
                <a href="/dashboard" className="dropdown-toggle no-arrow">
                  <span className="micon bi bi-layout-text-window-reverse" />
                  <span className="mtext">Dashboard</span>
                </a>
              </li>
              <li className="dropdown">
                <a href="javascript:;" className="dropdown-toggle">
                  <span className="micon bi bi-house" />
                  <span className="mtext"></span>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="index.html">Dashboard style 1</a>
                  </li>
                  <li>
                    <a href="index2.html">Dashboard style 2</a>
                  </li>
                  <li>
                    <a href="index3.html">Dashboard style 3</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="calendar.html" className="dropdown-toggle no-arrow">
                  <span className="micon bi bi-calendar4-week" />
                  <span className="mtext">Calendar</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
