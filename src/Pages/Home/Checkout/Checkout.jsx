import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    const packageInfo = useLoaderData();
    console.log(packageInfo);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    


    return (
        <div className="flex flex-row justify-center my-16 mx-auto">
            {
                packageInfo.map((item) => (
                    <div key={item.id} className="card card-compact w-96 h-[320px] bg-base-100 ">
                        <figure><img className='h-5/6 w-1/2' src={item.img} alt="" /></figure>
                        <div className="card-body text-center">
                            <h2 className="card-title text-lg font-medium">Item: {item.name}</h2>
                            <h2 className="card-title text-lg font-medium">Price: <span className="text-orange-500">{item.price}</span></h2>

                            <div className="mt-4">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                    item={item}></CheckoutForm>
                                </Elements>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Checkout;
