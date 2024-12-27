import React, { useEffect, useState } from "react";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { SETTINGS_ENDPOINT } from "../api/endpoints";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
import { successType, toastMessage } from "../utils/toastMessage";
import { DEFAULT_ERROR_MESSAGE } from "../constant";

const Settings = () => {
  const { setPageLoader, pageLoader } = useLoader();
  const [settings, setSettings] = useState({
    low_stock: false,
    order_placed: false,
    alert_notification: false,
  });
  useEffect(() => {
    setPageLoader((prev) => true);
    makeApiRequest({
      endPoint: SETTINGS_ENDPOINT,
      method: METHODS?.get,
    })
      .then((res) => {
        // update required : just need to test this that data is coming in this data or not
        // const dummyData = {
        //   id: 1,
        //   created_at: "2024-12-24T06:31:27.662721Z",
        //   updated_at: "2024-12-24T06:31:27.662734Z",
        //   low_stock: false,
        //   order_placed: false,
        //   alert_notification: true,
        //   user: 105,
        // };
        // const response = dummyData;
        const response = res?.data;
        const data = {
          low_stock: response?.low_stock,
          order_placed: response?.order_placed,
          alert_notification: response?.alert_notification,
        };
        setSettings(data);
      })
      .catch((err) => {
        console.log(err, "this is err");
      })
      .finally(() => {
        setPageLoader((prev) => false);
      });
  }, []);
  const updateSettings = (type) => {
    const payload = {
      ...settings,
      [type]: !settings?.[type],
    };
    console.log(payload, "this is payload");
    setPageLoader((prev) => true);

    makeApiRequest({
      endPoint: SETTINGS_ENDPOINT,
      payload: payload,
      method: METHODS?.post,
    })
      .then((res) => {
        console.log(res, "this is response");
        setSettings(payload);
        toastMessage("Settings changed successfully", successType);
      })
      .catch((err) => {
        console.log(err?.response?.data, "this is error");
        toastMessage(err?.response?.data || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        setPageLoader((prev) => false);
      });
  };

  return (
    <>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <div className="w-full">
          <div className="">
            <div className="flex gap-4 items-center p-4 rounded-lg">
              <div
                onClick={() => updateSettings("low_stock")}
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  settings.low_stock ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    settings.low_stock ? "transform translate-x-6" : ""
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
                onClick={() => updateSettings("order_placed")}
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  settings.order_placed ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    settings.order_placed ? "transform translate-x-6" : ""
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
                onClick={() => updateSettings("alert_notification")}
                className={`relative inline-block w-12 h-6 rounded-full transition duration-300 ease-in-out cursor-pointer ${
                  settings.alert_notification ? "bg-[#0A6259]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                    settings.alert_notification ? "transform translate-x-6" : ""
                  } bg-white`}
                ></span>
              </div>
              <div>
                <p className="font-semibold text-black">
                  Alert Preferences Form
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Options to set thresholds for low stock alerts and toggle
                  on/off different alert types.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
