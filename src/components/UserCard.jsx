import React from "react";

const UserCard = ({ user }) => {
    const {firstName,lastName, photoUrl ,age,gender,about}=user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
        className="w-100 h-100 object-cover rounded-lg shadow-md"// this whole style added by me after to image insdie the box
          src={photoUrl}
          alt="UserPhoto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p> {age + ", " + gender} </p>}
        
        {about && <p> {about} </p>}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
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

