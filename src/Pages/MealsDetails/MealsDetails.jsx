import useMenu from "../../hooks/useMenu";

const MealsDetails = () => {

    const [menu] = useMenu();

    return (
        <div>
            <div className="max-w-7xl mx-auto rounded-md bg-cover bg-center">
                <img src={menu.img} alt={menu.title} className="min-w-0 lg:min-w-[1220px] max-h-[450px] bg-cover" />
            </div>
        </div>
    );
};

export default MealsDetails;