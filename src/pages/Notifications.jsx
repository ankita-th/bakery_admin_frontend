import React, { useEffect, useState } from "react";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import usePagination from "../hooks/usePagination";
import {
  NOTIFICATION_DELETE_ENDPOINT,
  NOTIFICTION_GET_ENDPOINT,
} from "../api/endpoints";
import useLoader from "../hooks/useLoader";
import {
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
} from "../constant";
import NoDataFound from "../Components/Common/NoDataFound";
import Pagination from "../Components/Common/Pagination";
import SingleNotificationCard from "../Components/SingleNotificationCard";
import PageLoader from "../loaders/PageLoader";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import useModalToggle from "../hooks/useModalToggle";
import { deleteItemBasedOnId } from "../utils/helpers";
import { successType, toastMessage } from "../utils/toastMessage";

const Notifications = () => {
  const { page, onPageChange } = usePagination();
  const { toggleLoader, pageLoader } = useLoader();
  const { showModal: showDeleteModal, toggleModal: toggleDeleteModal } =
    useModalToggle();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    toggleLoader("pageLoader");
    const apiParams = {
      page: page,
    };
    makeApiRequest({
      endPoint: NOTIFICTION_GET_ENDPOINT,
      params: apiParams,
      method: METHODS.get,
    })
      .then((res) => {
        setNotification(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleLoader("PageLoader");
      });
  }, [page]);

  const deleteNotification = () => {
    setDeleteLoader((prev) => true);
    makeApiRequest({
      endPoint: NOTIFICATION_DELETE_ENDPOINT,
      method: METHODS?.delete,
      delete_id: itemToDelete,
    })
      .then((res) => {
        toastMessage("Notification deleted successfully", successType);
        setNotification(deleteItemBasedOnId(notifications, itemToDelete));
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally((res) => {
        toggleDeleteModal();
        setDeleteLoader((prev) => false);
        setItemToDelete(null);
      });
  };
  const handleDeleteClick = (delete_id) => {
    toggleDeleteModal();
    setItemToDelete(delete_id);
  };
  return (
    <>
      {pageLoader ? (
        <PageLoader />
      ) : (
        <>
          {notifications?.length ? (
            notifications?.map((it, idx) => (
              <SingleNotificationCard
                key={idx}
                item={it}
                handleDeleteClick={handleDeleteClick}
              />
            ))
          ) : (
            <NoDataFound />
          )}
          <Pagination
            onPageChange={onPageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalData={totalData}
          />
          {showDeleteModal && (
            <DeleteConfirmationModal
              title="Are you sure you want to remove this Notification?"
              description="This action cannot be redo."
              onCancel={() => {
                setItemToDelete(null);
                toggleDeleteModal();
              }}
              onDelete={deleteNotification}
              loader={deleteLoader}
            />
          )}
        </>
      )}
    </>
  );
};
export default Notifications;
