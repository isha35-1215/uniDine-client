import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../../hooks/useMenu';
import MenuCards from '../MenuCards/MenuCards';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [menu] = useMenu();
    const breakfast = menu.filter(item => item.category === 'breakfast');
    const lunch = menu.filter(item => item.category === 'lunch');
    const dinner = menu.filter(item => item.category === 'dinner');
    return (
        <div>
            <h1 className='text-center text-3xl lg:text-4xl font-bold text-orange-600 mt-4'>Your Daily Delights</h1>
            <h6 className="text-center text-lg lg:text-xl text-orange-500 m-4">Choose Your Culinary Adventure</h6>
            <Tabs>
                <TabList className='text-center border-b-2 border-b-orange-500'>
                    <Tab>All Meals</Tab>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>

                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                        {menu.map((items) => (
                            <MenuCards 
                            key={items._id}
                            items={items}
                            ></MenuCards>
                        ))}
                    </div>                
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                        {breakfast.map((items) => (
                            <MenuCards 
                            key={items._id}
                            items={items}
                            ></MenuCards>
                        ))}
                    </div>  
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                        {lunch.map((items) => (
                            <MenuCards 
                            key={items._id}
                            items={items}
                            ></MenuCards>
                        ))}
                    </div>  
                </TabPanel>
                <TabPanel>
                <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-12 my-10 px-12 md:px-20 lg:px-24">
                        {dinner.map((items) => (
                            <MenuCards 
                            key={items._id}
                            items={items}
                            ></MenuCards>
                        ))}
                    </div>  
                </TabPanel>
                <div className="flex justify-center"> 
                <Link to={'/meals'}>
                <button className=" btn btn-outline border-b-4 px-8 text-orange-600 border-b-orange-600 border-orange-500 text-base font-semibold text-center mx-auto">See All</button>
                </Link>           
            </div>
            </Tabs>
        </div>
    );
};

export default Menu;