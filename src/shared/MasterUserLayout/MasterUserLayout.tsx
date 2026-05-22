import { Outlet } from 'react-router-dom';
import Footer from '../../features/user/components/shared/Footer';
import Navbar from '../../features/user/components/shared/Navbar';

function MasterUserLayout() {
  return (
    <>
      <div className="md:px-16 ">
        <Navbar />
        <div className="page-wrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MasterUserLayout;
