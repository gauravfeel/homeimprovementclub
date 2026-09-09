import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadCapturePopup from "./LeadCapturePopup";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 site-main route-enter"
        key={pathname}
      >
        {children}
      </main>
      <Footer />
      <LeadCapturePopup />
    </div>
  );
};

export default Layout;
