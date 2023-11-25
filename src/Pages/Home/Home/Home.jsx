import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Menu from "../Menu/Menu/Menu";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>UniDine | Home</title>
            </Helmet>
            <Banner></Banner>
            <Menu></Menu>
            <h2>this is home</h2>
        </div>
    );
};

export default Home;