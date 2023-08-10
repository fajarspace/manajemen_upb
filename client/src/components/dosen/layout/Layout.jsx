import NavAdmin from "./NavAdmin";
import FooterAdmin from "./FooterAdmin";

const Layout = ({ children }) => {
  return (
    <>
      <NavAdmin />
      {children}
      <FooterAdmin />
    </>
  );
};

export default Layout;
