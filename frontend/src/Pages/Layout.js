import { Outlet } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar';

// Page Layout
const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default Layout;
