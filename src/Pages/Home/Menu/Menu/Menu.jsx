import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../../hooks/useMenu';
import MenuCards from '../MenuCards/MenuCards';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";


const Menu = () => {
    const [menu] = useMenu();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

    const totalPageCount = Math.ceil(menu.length / itemsPerPage);

    const renderMenuCards = (items) => (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
            {items.map((item) => (
                <MenuCards key={item._id} items={item} />
            ))}
        </div>
    );

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const isNextDisabled = indexOfLastItem >= menu.length;

   


    const breakfast = menu.filter(item => item.category === 'breakfast');
    const currentBreakfast = breakfast.slice(indexOfFirstItem, indexOfLastItem);
    const totalBreakfast = Math.ceil(breakfast.length / itemsPerPage);

    const lunch = menu.filter(item => item.category === 'lunch');
    const currentLunch = lunch.slice(indexOfFirstItem, indexOfLastItem);
    const totalLunch = Math.ceil(lunch.length / itemsPerPage);

    const dinner = menu.filter(item => item.category === 'dinner');
    const currentDinner = dinner.slice(indexOfFirstItem, indexOfLastItem);
    const totalDinner = Math.ceil(dinner.length / itemsPerPage);


    const renderBreakfast = (items) => (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
            {items.map((item) => (
                <MenuCards key={item._id} items={item} />
            ))}
        </div>
    );
    const renderLunch = (items) => (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
            {items.map((item) => (
                <MenuCards key={item._id} items={item} />
            ))}
        </div>
    );
    const renderDinner = (items) => (
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
            {items.map((item) => (
                <MenuCards key={item._id} items={item} />
            ))}
        </div>
    );

    const handleBreakfastChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const isBreakfastDisabled = indexOfLastItem >= breakfast.length;

    const handleLunchChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const isLunchDisabled = indexOfLastItem >= lunch.length;

    const handleDinnerChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const isDinnerDisabled = indexOfLastItem >= dinner.length;

    return (
        <div className='mt-16'>
            <h1 className='text-center text-3xl lg:text-4xl font-bold'>Your Daily Delights</h1>
            <h6 className="text-center text-lg lg:text-xl  m-4">Choose Your Culinary Adventure!</h6>
            <Tabs>
                <TabList className='text-center border-b-2 border-b-orange-500'>
                    <Tab>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                    {renderMenuCards(currentItems)}
                    <div className="flex justify-center">
                        <GrFormPreviousLink
                            className={`text-2xl ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                        />

                        <span className="mx-4">
                            Page {currentPage} of {totalPageCount}
                        </span>
                        <GrFormNextLink
                            className={`text-2xl ${isNextDisabled ? 'text-gray-300' : 'text-orange-500'} ${isNextDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{ pointerEvents: isNextDisabled ? 'none' : 'auto' }}
                        />
                    </div>

                </TabPanel>
                <TabPanel>
                {renderBreakfast(currentBreakfast)}
                    <div className="flex justify-center">
                        <GrFormPreviousLink
                            className={`text-2xl ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                        />

                        <span className="mx-4">
                            Page {currentPage} of {totalBreakfast}
                        </span>
                        <GrFormNextLink
                            className={`text-2xl ${isBreakfastDisabled ? 'text-gray-300' : 'text-orange-500'} ${isBreakfastDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => handleBreakfastChange(currentPage + 1)}
                            style={{ pointerEvents: isBreakfastDisabled ? 'none' : 'auto' }}
                        />
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
                        {breakfast.map((items) => (
                            <MenuCards
                                key={items._id}
                                items={items}
                            ></MenuCards>
                        ))}
                    </div> */}
                </TabPanel>
                <TabPanel>
                {renderLunch(currentLunch)}
                    <div className="flex justify-center">
                        <GrFormPreviousLink
                            className={`text-2xl ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                        />

                        <span className="mx-4">
                            Page {currentPage} of {totalLunch}
                        </span>
                        <GrFormNextLink
                            className={`text-2xl ${isLunchDisabled ? 'text-gray-300' : 'text-orange-500'} ${isLunchDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => handleLunchChange(currentPage + 1)}
                            style={{ pointerEvents: isLunchDisabled ? 'none' : 'auto' }}
                        />
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8 my-10 px-12 md:px-20 lg:px-24">
                        {lunch.map((items) => (
                            <MenuCards
                                key={items._id}
                                items={items}
                            ></MenuCards>
                        ))}
                    </div> */}
                </TabPanel>
                <TabPanel>
                {renderDinner(currentDinner)}
                    <div className="flex justify-center">
                        <GrFormPreviousLink
                            className={`text-2xl ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 cursor-pointer'}`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                        />

                        <span className="mx-4">
                            Page {currentPage} of {totalDinner}
                        </span>
                        <GrFormNextLink
                            className={`text-2xl ${isDinnerDisabled ? 'text-gray-300' : 'text-orange-500'} ${isDinnerDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => handleDinnerChange(currentPage + 1)}
                            style={{ pointerEvents: isDinnerDisabled ? 'none' : 'auto' }}
                        />
                    </div>
                </TabPanel>
                <div className="flex justify-center my-4">
                    <Link to={'/meals'}>
                        <button className=" btn btn-outline border-b-4 px-8 text-orange-600 border-b-orange-600 border-orange-500 text-base font-semibold text-center mx-auto">See All</button>
                    </Link>
                </div>
            </Tabs>
        </div>
    );
};

export default Menu;