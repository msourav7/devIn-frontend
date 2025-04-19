import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [showButtons, setShowButtons] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      //passed empty because here we are not sending any typed request
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Requests error : " + err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
      console.log(res.data);
    } catch (err) {
      console.error("Requests error : " + err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // if (!requests) return;
  // if (requests.length === 0) return <h1>No Requests Found</h1>;
  if (!requests || requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <>
      <div className="pb-36">
        <div className="text-center my-10">
          <h1 className="font-bold text-white text-3xl">Requests</h1>

          {requests.map((e) => {
            const { _id, firstName, lastName, age, gender, about, photoUrl } =
              e.fromUserId; //these are all coming USER_SAFE_DATA from userRouter from backendwhich we are allowing to see other what they can see of connec. detail
            return (
              <div
                key={_id}
                className=" flex m-4 p-4 justify-center items-center rounded-lg bg-base-300 w-full mx-auto"
              >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left mx-4">
                  {lastName && (
                    <h2 className="font-bold text-lg">
                      {firstName + " " + lastName}
                    </h2>
                  )}{" "}
                  {/* show lastName only when it is present otherwise it show undefined */}
                  <p>{age + " " + gender}</p>
                  <p>{about}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-[3px]">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => reviewRequest("rejected", e._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-2 "
                    onClick={() => reviewRequest("accepted", e._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;
