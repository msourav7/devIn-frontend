import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

//This user in props is comming from Profile.jsx
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToaste] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToaste(true);
      setTimeout(() => {
        setShowToaste(false);
      }, 3000);
      console.log(res);
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <>
    <div className="pb-24">
      {/* <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center my-10 gap-6">
        <div className="w-full max-w-md lg:max-w-fit">
          <div className="card bg-base-300 w-96 shadow-xl"> */}
          
        <div className="flex flex-col lg:flex-row items-center justify-center my-10 lg:gap-6 gap-3">
         <div className="flex justify-center w-full lg:w-auto">
          <div className="card bg-base-300 w-95 shadow-xl">

            
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-1">
                    <span className="label-text">Last Name </span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-1">
                    <span className="label-text">Photo Url </span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-1">
                    <span className="label-text">Age </span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-1">
                    <span className="label-text">Gender </span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label my-1">
                    <span className="label-text">About </span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    placeholder=""
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              <p className="text-red-600">{error}</p>

              <div className="card-actions justify-center my-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full max-w-md lg:max-w-fit"> */}
        <div className="flex justify-center w-95 lg:w-auto">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            showActions={false}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile Saved successfully!</span>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default EditProfile;
