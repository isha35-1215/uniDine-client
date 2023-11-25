import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase/firebase.config";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";


const Login = () => {

    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {

        signInWithPopup(auth, provider)
            .then(res => {
                console.log(res);
                swal("Congrats!!", "You are successfully logged in!", "success");

                navigate(location?.state ? location.state : '/');

            })
            .catch(err => {
                console.log(err);
            })
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        signIn(data.Email, data.Password)
            .then(result => {
                console.log(result.user);
                swal("Congrats!!", "Logged in Successfully!", "success")

                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                console.error(error);
                swal("Oops!", "Email or password doesn't match. Please try again.", "error");
            })
    }

    return (
        <>
        <Helmet>
                <title>UniDine | Login</title>
            </Helmet>
        <div className="mb-10">
            <div className="hero py-40 ">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl text-orange-600 font-bold">Login now!</h1>
                    </div>
                    <div className="card w-96 shadow-sm bg-orange-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Email" {...register("Email", { required: true })} name="Email" className="input input-bordered"  />
                                    {errors.Email && <span className="text-red-700 text-xs py-1">Email is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" {...register("Password", { required: true })} name="Password" className="input input-bordered"  />
                                    {errors.Password?.type === 'required' && <span className="text-red-700 text-xs py-1">Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-warning bg-orange-500 border-orange-500 normal-case text-lg text-white">Login</button>
                                </div>
                                

                            </form>
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-warning normal-case text-lg font-bold bg-orange-200 w-full mt-2 border-orange-300 ">
                                <FcGoogle></FcGoogle>
                                Continue with Google
                            </button>
                            <p className="">Do not have an account? <Link className="text-orange-500 font-medium" to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;