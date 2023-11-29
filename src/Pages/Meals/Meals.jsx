import { useEffect, useState } from "react";
import useMenu from "../../hooks/useMenu";
import MenuCards from "../Home/Menu/MenuCards/MenuCards";
import { Helmet } from "react-helmet-async";

const Meals = () => {
    const [menu] = useMenu();
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Filter by search input
        let filteredData = menu.filter((card) =>
            card.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Filter by category
        if (selectedCategory) {
            filteredData = filteredData.filter((card) =>
                card.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filter by price range
        if (selectedPriceRange === 'low') {
            filteredData = filteredData.filter((card) => card.price < 10);
        } else if (selectedPriceRange === 'medium') {
            filteredData = filteredData.filter((card) => card.price >= 10 && card.price <= 15);
        } else if (selectedPriceRange === 'high') {
            filteredData = filteredData.filter((card) => card.price > 15);
        }

        setCards(filteredData);
    }, [searchInput, selectedCategory, selectedPriceRange, menu]);

    

    return (
        <div>
            <Helmet>
                <title>UniDine | Meals</title>
            </Helmet>
            <h1 className="text-center text-3xl lg:text-4xl font-bold text-orange-600 mt-4">UniDine Culinary Haven</h1>
            <p className="text-center text-lg lg:text-xl text-orange-500 m-4">Savor Every Moment with Our Exquisite Meal Collection</p>
                <div className="input-group flex w-72 mx-auto my-2">
                    <input
                        type="text"
                        placeholder="Search by Title..."
                        className="input input-bordered border-orange-500 rounded-r-none"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="btn btn-secondary bg-orange-500 rounded-l-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8  text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            <div className="pb-10 form-control flex flex-row justify-center">

                <div>
                <select
                    className="select select-bordered border-orange-500 ml-2 w-36"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                </div>

                <div>
                <select
                    className="select select-bordered border-orange-500 ml-2 w-46"
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                    <option value="">All Prices</option>
                    <option value="low">Low (less than $10)</option>
                    <option value="medium">Medium ($10 - $15)</option>
                    <option value="high">High (more than $15)</option>
                </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                {cards.map((item) => (
                    <MenuCards
                        key={item._id}
                        items={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Meals;
