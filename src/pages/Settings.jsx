import React, { useState } from 'react'

const Settings = () => {
  
    const [saveAddress, setSaveAddress] = useState({
        stock: false,
        order: false,
        alert: false,
      });
    
      return (
        <div className="w-full">
          <div className="">
            <div className="flex gap-4 items-center p-4 rounded-lg">
              <div
                onClick={() =>
                  setSaveAddress((prev) => ({
                    ...prev,
                    stock: !prev.stock,
                  }))
                }
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  saveAddress.stock ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    saveAddress.stock ? "transform translate-x-6" : ""
                  } bg-white`}
                ></span>
              </div>
              <div>
                <p className="font-semibold text-black">Low Stock Alerts</p>
                <p className="text-sm text-gray-500 mt-1">
                  Allow users to customize alert preferences, such as receiving
                  daily or weekly summaries.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-4 items-center p-4 rounded-lg">
              <div
                onClick={() =>
                  setSaveAddress((prev) => ({ ...prev, order: !prev.order }))
                }
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  saveAddress.order ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    saveAddress.order ? "transform translate-x-6" : ""
                  } bg-white`}
                ></span>
              </div>
              <div>
                <p className="font-semibold text-black">Order Alerts</p>
                <p className="text-sm text-gray-500 mt-1">
                  Maintain a log of all alerts for tracking and analysis.
                </p>
              </div>
            </div>
    
            <div className="flex gap-4 items-center p-4 rounded-lg">
              <div
                onClick={() =>
                  setSaveAddress((prev) => ({ ...prev, alert: !prev.alert }))
                }
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  saveAddress.alert ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    saveAddress.alert ? "transform translate-x-6" : ""
                  } bg-white`}
                ></span>
              </div>
              <div>
                <p className="font-semibold text-black">Alert Preferences Form</p>
                <p className="text-sm text-gray-500 mt-1">
                  Options to set thresholds for low stock alerts and toggle on/off
                  different alert types.
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Settings
