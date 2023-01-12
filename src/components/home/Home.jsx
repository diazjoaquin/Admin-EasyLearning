import Dashboard from "./dashboard/Dashboard";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {


    const userDB = JSON.parse(localStorage.getItem("user"))
    console.log(userDB);

    return (
        <section>
            <Sidebar />
            <Dashboard />
        </section>
    )
};

export default Home;