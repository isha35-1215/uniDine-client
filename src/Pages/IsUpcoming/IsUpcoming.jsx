import UpcomingCard from "./UpcomingCard";
import useUpcoming from "../../hooks/useupcoming";

const IsUpcoming = () => {

    const [allNew, refetch] = useUpcoming();


    // const [allNew, setAllNew] = useState([]);
    // console.log(allNew);

    // useEffect(() => {
    //     fetch(`https://uni-dine-server.vercel.app/upcomings`)
    //         .then((res) => res.json())
    //         .then((data) => setAllNew(data));
    // }, []);


    return (
        <div>
            <h1 className="py-6 text-4xl text-center font-bold">Upcoming Items: {allNew.length}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                {allNew.map((item) => (
                    <UpcomingCard
                        key={item._id}
                        items={item}
                        refetch={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default IsUpcoming;