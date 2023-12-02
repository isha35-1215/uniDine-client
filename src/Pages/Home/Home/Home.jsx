import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Menu from "../Menu/Menu/Menu";
import Membership from "../Membership/Membership";
import PopularFood from "../PopularFood/PopularFood";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>UniDine | Home</title>
            </Helmet>
            <Banner></Banner>
            <Menu></Menu>
            <Membership></Membership>
            <PopularFood></PopularFood>
        </div>
    );
};

export default Home;