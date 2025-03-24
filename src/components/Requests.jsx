import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store)=>store.requests)

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
      console.log(res.data)
    } catch (err) {
      console.error("Requests error : " + err.message);
      
    }
  };

  useEffect(()=>{
    fetchRequests()
  },[])

  if (!requests) return;
  if (requests === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Requests</h1>

      {requests.map((e) => {
        const {_id, firstName, lastName, age, gender, about, photoUrl } = e.fromUserId; //these are all USER_SAFE_DATA from userRouter from backendwhich we are allowing to see other what they can see of connec. detail
        return (
          <div key={_id} className=" flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4"> 
              {lastName && <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>} {/* show lastName only when it is present otherwise it show undefined */}
              <p>{age + " " + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
