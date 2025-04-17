import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

//this {user is comming from feed.jsx}
const UserCard = ({ user ,showActions = true}) => {
    const {_id,firstName,lastName, photoUrl ,age,gender,about}=user;
    console.log(_id)
    const dispatch = useDispatch();

    const handleSendRequest=async(status,userId)=>{
      try{//in post call 2nd we need to pass some data in 2nd para. here no para. is req so for now it is empty
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true})
        dispatch(removeUserFromFeed(userId))
        console.log(res)
      }catch(err){
        console.log('User Card Error' + err.message)
      }
    }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
        className="w-100 h-100 object-cover rounded-lg shadow-md"// custom style added by me after to image insdie the box
          src={photoUrl}
          alt="UserPhoto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p> {age + ", " + gender} </p>}
        
        {about && <p> {about} </p>}
        {showActions && (
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleSendRequest("intrested",_id)}>Interested</button>
        </div>)}
      </div>
    </div>
  );
};

export default UserCard;




// import React from "react";

// const UserCard = ({ user }) => {
//   const { firstName, lastName, photoUrl, age, gender, about } = user;

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl">
//       <figure className="flex justify-center items-center w-full">
//         <img
//           src={photoUrl}
//           alt="UserPhoto"
//           className="w-100 h-100 object-cover rounded-lg shadow-md"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p> {age + ", " + gender} </p>}
//         {about && <p> {about} </p>}
//         <div className="card-actions justify-center my-4">
//           <button className="btn btn-primary">Ignore</button>
//           <button className="btn btn-secondary">Interested</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

