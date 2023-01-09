import Dashboard from "../dashboard/Dashboard";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
// import { styled } from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import MuiDrawer from '@mui/material/Drawer';

const Home = () => {

    return (
        <section>
            <Sidebar />
            <Dashboard />
        </section>
    )
};

export default Home;