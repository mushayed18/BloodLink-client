import ContactUs from "./ContactUs";
import Featured from "./Featured";
import SwiperLayout from "./SwiperLayout";

const Home = () => {
    return (
        <div className="min-h-screen">
            <SwiperLayout></SwiperLayout>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;