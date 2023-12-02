import { Link } from "react-router-dom";

const PopularFood = () => {
    return (
        <div className="mt-10">
            <h1 className=' text-center text-3xl lg:text-4xl font-bold  mt-4'>Our Popular Items</h1>
            <h6 className="text-center text-lg lg:text-xl m-4">Explore The Charm of Our Most Loved Dishes!</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                <div className="card card-compact  h-[380px] md:h-[250px] lg:h-[390px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
                    <figure className="px-4 pt-6">
                        <img src="https://i.ibb.co/LnBXHB5/authentic-italian-pasta.jpg" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Vegetarian Pasta Primavera</h2>
                        <p className="text-lg font-medium">Price: <span className="text-orange-600 font-semibold">$15.75</span></p>
                        <div className="flex justify-center">
                            <span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span>
                        </div>
                        <div className="card-actions">
                            <Link to={"/meal/6566f2c03f8a4b7bada19ce1"}>
                                <button className="btn btn-warning w-64 md:w-36 lg:w-80 text-base text-white bg-orange-500 border-orange-400 normal-case">View Item</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card card-compact  h-[380px] md:h-[250px] lg:h-[390px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
                    <figure className="px-4 pt-6">
                        <img src="https://i.ibb.co/RPK6pJs/fresh-sandwich-cutting-board-with-healthy-tomatoes-generative-ai.jpg" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Spicy Chicken Wrap</h2>
                        <p className="text-lg font-medium">Price: <span className="text-orange-600 font-semibold">$11.75</span></p>
                        <div className="flex justify-center">
                            <span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span>
                        </div>
                        <div className="card-actions">
                            <Link to={"/meal/6566f1383f8a4b7bada19ce0"}>
                                <button className="btn btn-warning w-64 md:w-36 lg:w-80 text-base text-white bg-orange-500 border-orange-400 normal-case">View Item</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card card-compact  h-[380px] md:h-[250px] lg:h-[390px] bg-base-100 shadow-xl border-orange-500 border-[1px]">
                    <figure className="px-4 pt-6">
                        <img src="https://i.ibb.co/1TZxmr3/turkish-breakfast-shakshuka-olives-cheese-fruit-rich-brunch.jpg" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Hearty Veggie Omelette</h2>
                        <p className="text-lg font-medium">Price: <span className="text-orange-600 font-semibold">$9.75</span></p>
                        <div className="flex justify-center">
                            <span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span><span className="text-yellow-400 text-2xl">
                                ★
                            </span>
                        </div>
                        <div className="card-actions">
                            <Link to={"/meal/6566ee063f8a4b7bada19cdb"}>
                                <button className="btn btn-warning w-64 md:w-36 lg:w-80 text-base text-white bg-orange-500 border-orange-400 normal-case">View Item</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularFood;