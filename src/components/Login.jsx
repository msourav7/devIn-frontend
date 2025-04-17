import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { EyeOff, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [emailId, setEmailId] = useState("eren@gmail.com");
  const [password, setPassword] = useState("Eren@123");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true } // setting it to true to get cookies with token in browser storage
      );
      console.log(res.data);
      dispatch(addUser(res.data)); //dispatching anaction toadd the res.data toaddUser reducer tostore the userData instore
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Somthing went wrong");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Somthing went wrong");
      console.error(err);
    }
  };

  return (
    // <div className="flex justify-center my-5 ">
    <div className="min-h-screen flex items-center justify-center overflow-y-auto p-1 ">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoginForm ? "login" : "signup"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
          className="card bg-base-300 w-96 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
            <div className="">
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text h-5 text-base">
                        First Name
                      </span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      placeholder=""
                      className="input input-bordered w-full max-w-xs h-14 text-base"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text h-5 pt-3 pb-7">
                        Last Name
                      </span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      placeholder=""
                      className="input input-bordered w-full max-w-xs h-14 text-base"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>{" "}
                </>
              )}

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text h-5 pt-3 pb-7">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  placeholder=""
                  className="input input-bordered w-full max-w-xs h-14 text-base"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text h-5 pt-3 pb-7">Password</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs pr-10 h-14 text-base" // add right padding for icon space
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </label>

              {/* <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password </span>
              </div>
              <input
                type="password"
                value={password}
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label> */}
            </div>

            <p className="text-red-600">{error}</p>

            <div className="card-actions justify-center my-2">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign UP"}
              </button>
            </div>
            {/* <p className="" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New User? Sign Up Here":"Existing User? Login Here"}</p> */}
            <p
              className="text-center cursor-pointer py-2 font-bold text-lg hover:text-gray-600 hover:underline transform hover:scale-110 transition-all duration-200"
              // onClick={() => setIsLoginForm(!isLoginForm)} //better way below cuz performing new operation of setErroras well
              onClick={() => {
                setIsLoginForm((prev) => !prev);
                setError(""); // Clear error when switching forms
              }}
            >
              {isLoginForm
                ? "New User? Sign Up Here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </motion.div>{" "}
      </AnimatePresence>
    </div>
  );
};

export default Login;
