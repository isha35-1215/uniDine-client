import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.Email, data.Password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(data.Name, data.Photo)
                    .then(() => {
                        // console.log("updated")
                        const userInfo = {
                            name: data.Name,
                            email: data.Email
                            
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    swal("Congrats!!", "User Added Successfully!", "success");
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => {
                        console.error(error)
                    })
                // swal("Congrats!!", "You are successfully registered!", "success");
                // navigate('/');
            })

    }


    return (
        <>
            <Helmet>
                <title>UniDine | Register</title>
            </Helmet>
            <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto font-poppins">
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-orange-600">Register now!</h1>
                        </div>
                        <div className="card w-96 shadow-xl bg-orange-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Name" {...register("Name", { required: true })} name="Name" className="input input-bordered" />
                                    {errors.Name && <span className="text-red-700 text-xs py-1">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" {...register("Email", { required: true })} name="Email" className="input input-bordered" />
                                    {errors.Email && <span className="text-red-700 text-xs py-1">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" placeholder="Photo URL" {...register("Photo", { required: true })} name="Photo" className="input input-bordered" />
                                    {errors.Photo && <span className="text-red-700 text-xs py-1">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" {...register("Password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name="Password" className="input input-bordered" />
                                    {errors.Password?.type === 'required' && <span className="text-red-700 text-xs py-1">Password is required</span>}
                                    {errors.Password?.type === 'minLength' && <span className="text-red-700 text-xs py-1">Password must be 6 characters</span>}
                                    {errors.Password?.type === 'maxLength' && <span className="text-red-700 text-xs py-1">Password can't more than 20 characters</span>}
                                    {errors.Password?.type === 'pattern' && <span className="text-red-700 text-xs py-1">Password must be atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character.</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary bg-orange-500 border-orange-500 text-white">Register</button>
                                </div>
                                <p className="">Already have an account? <Link className="text-orange-500 font-medium" to="/login">Login</Link></p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;