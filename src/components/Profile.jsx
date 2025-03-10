import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (// was showing undefined in console while calling this user in EditProfile comp. cuz we need add a check if user is presend or noy
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
