import React from "react";
import DiscountOptionCard from "./DiscountOptionCard";
import {
  crossIcon,
  orderDiscountIcon,
  productDiscountIcon,
  shippingDiscountIcon,
} from "../assets/Icons/Svg";
import { useNavigate } from "react-router-dom";
const discountOptions = [
  {
    title: "Amount Off Products",
    description: "Discount specific products or collections of products.",
    buttonText: "Product Discount",
    icon: productDiscountIcon,
  },
  {
    title: "Buy X Get Y",
    description: "Discount products based on a customer's purchase.",
    buttonText: "Product Discount", // update required:Need to update this text
    icon: productDiscountIcon, // update required:Need to update this icon
  },
  {
    title: "Amount Off Order",
    description: "Discount the total order amount.",
    buttonText: "Order Discount",
    icon: orderDiscountIcon,
  },
  {
    title: "Free Shipping",
    description: "Offer free shipping on an order.",
    buttonText: "Shipping Discount",
    icon: shippingDiscountIcon,
  },
];

const DiscountTypeSection = ({ onClose }) => {
  const navigate = useNavigate();
  const handleRedirection = (title) => {
    navigate("/add-edit-discount", { state: { title } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="cursor-pointer relative bottom-[180px] left-[1005px] text-black bg-[#ff6d2f]"
        onClick={onClose}
      >
        {crossIcon}
      </div>
      <div className=" w-4/5 bg-white border p-5 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">Select discount type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discountOptions.map((opt, idx) => (
            <DiscountOptionCard
              key={idx}
              option={opt}
              handleRedirection={handleRedirection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountTypeSection;
