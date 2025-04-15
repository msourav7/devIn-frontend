import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
      console.log(res.data.data);
    } catch (err) {
      console.error("Error - " + err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections === 0) return <h1>No Connections Found</h1>;

  // return (
  //   <div className="text-center my-10">
  //     <h1 className="font-bold text-white text-3xl">Connections</h1>

  //     {connections.map((e) => {
  //       const { _id,firstName, lastName, age, gender, about, photoUrl } = e; //these are all USER_SAFE_DATA from userRouter which we are allowing to see other what they can see of connec. detail
  //       return (
  //         <div key={_id}
  //         // className=" flex m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto"
  //         className="flex flex-col md:flex-row md:items-center m-4 p-4 rounded-lg bg-base-300 w-11/12 md:w-1/2 mx-auto"

  //         >
  //           <div>
  //             <img alt="photo" className="w-20 h-20 rounded-full object-center" src={photoUrl} />
  //           </div>
  //           <div className="text-left mx-4">
  //             {lastName && <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>} {/* show lastName only when it is present otherwise it show undefined */}
  //             <p>{age + " " + gender}</p>
  //             <p>{about}</p>
  //           </div>
  //           <button className="btn btn-primary mt-4 md:mt-0 md:ml-auto self-start md:self-center">Chat</button>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>

      {connections.map((e) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } = e;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row md:items-center m-4 p-4 rounded-lg bg-base-300 w-11/12 md:w-1/2 mx-auto"
          >
            {/* Group photo + bio in a row always */}
            <div className="flex items-center">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-center"
                src={photoUrl}
              />
              <div className="text-left mx-4">
                {lastName && (
                  <h2 className="font-bold text-lg">
                    {firstName + " " + lastName}
                  </h2>
                )}
                <p>{age + " " + gender}</p>
                <p>{about}</p>
              </div>
            </div>

            <Link to={"/chat/"+_id}>
              <button className="btn btn-primary mt-4 md:mt-0 mx-auto md:mx-0 md:ml-auto self-start md:self-center">
                Chat
              </button>
            </Link>
          </div>
        );
      })} 
    </div>
  );
};

export default Connections;
