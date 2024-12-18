import React from "react";
import {  notificationBell, notificationCross } from "../assets/Icons/Svg";
import moment from "moment";

const SingleNotificationCard = ({ item, handleDeleteClick }) => {
  const { title, message, id, created_at, is_read, recipient, sender } = item;
  const time = "2 mins ago";

  return (
    <>
       <div className="flex gap-4 p-4 border rounded-lg bg-white mb-2">
      <div className="text-2xl text-orange-500 bg-[#FFEFE7] rounded-full p-1 h-min">
        <span role="img" aria-label="notification">
          {notificationBell}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-[#969696] mt-1">{message}</p>
        <small className="text-xs text-black mt-2 block">{moment(created_at).fromNow()}</small>
      </div>
      <div>
      <button
        className="text-[#0A6259]"
        onClick={() => handleDeleteClick(id)}
      >
        {notificationCross}
      </button>
      </div>
    </div>
    </>
  );
};

export default SingleNotificationCard;
