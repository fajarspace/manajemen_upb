import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const Home = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Home;
