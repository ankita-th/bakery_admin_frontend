import React, { useEffect, useState } from "react";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT } from "../api/endpoints";
import AddEditCategorySection from "./AddEditCategorySection";
import { useForm } from "react-hook-form";
import { editIcon } from "../assets/Icons/Svg";
import ErrorMessage from "./Common/ErrorMessage";
import { successType, toastMessage } from "../utils/toastMessage";
import { DEFAULT_ERROR_MESSAGE } from "../constant";

const CategorySection = ({ formConfig, fieldName, rules }) => {
  const [file, setFile] = useState();
  const {
    register,
    watch,
    formState: { errors },
  } = formConfig;
  const categoryFormConfig = useForm();
  const { reset } = categoryFormConfig;
  const [categories, setCategories] = useState([]);
  const [showCategoryAddSection, setShowCateoryAddSection] = useState(false);
  const [btnLoaders, setBtnLoaders] = useState({
    publish: false,
    draft: false,
  });
  const editCategoryInfo = { isEdit: false, editItem: null };
  useEffect(() => {
    makeApiRequest({ endPoint: CATEGORIES_ENDPOINT, method: METHODS.get })
      .then((res) => {
        setCategories(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleButtonLoaders = (type) => {
    setBtnLoaders({ ...btnLoaders, [type]: !btnLoaders[type] });
  };

  const handleAddCategory = (values, event) => {
    const buttonType = event.nativeEvent.submitter.name;

    handleButtonLoaders(buttonType);
    // const payload = {
    //   ...values,
    //   is_active: buttonType === "publish",
    // };
    const payload = {
      name: values.name,
      slug: values.slug,
      // category_image: file.file,
      description: values.description,
      is_active: buttonType === "publish",
    };
    delete payload.image;
    // converting payload into form data
    const formData = new FormData();

    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    // appending file
    if (file?.file) {
      formData.append("category_image", file.file);
    }

    const data = Object.fromEntries(formData.entries()); // Convert to object
    console.log(data, "recipe payload");
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS?.post,
      payload: formData,
      instanceType: INSTANCE.formInstance,
      // payload: payload,
    })
      .then((res) => {
        setCategories((prev) => [...prev, res?.data]);
        toastMessage(`Category added sucessfully`, successType);
      })
      .catch((err) => {
        toastMessage(handleCategoryErrorToast(err));
      })
      .finally(() => {
        setShowCateoryAddSection(false);
        handleReset();
      });
  };
  const handleReset = () => {
    reset();
    setFile(null);
    setBtnLoaders({ publish: false });
  };
  const handleCategoryErrorToast = (err) => {
    if (err?.response?.data?.name?.[0]) {
      return err?.response?.data?.name?.[0];
    } else if (err?.response?.data?.slug?.[0]) {
      return err?.response?.data?.slug?.[0];
    } else {
      return DEFAULT_ERROR_MESSAGE;
    }
  };
  return (
    <div>
      <div className="category-container">
        <div className="category-heading">
          <h5>Categories</h5>
          <span
            onClick={() => {
              setShowCateoryAddSection(true);
            }}
          >
            +Add
          </span>
        </div>
        <div className="catgoryListing">
          {categories?.length > 0 ? (
            categories.map(({ id, name }, index) => {
              return (
                <div key={index}>
                  <input
                    {...register(fieldName, rules)}
                    type="checkbox"
                    value={id}
                  />
                  {name}
                </div>
              );
            })
          ) : (
            <div>No categories yet</div>
          )}
        </div>
      </div>
      <ErrorMessage customError={errors?.[fieldName]?.message} />

      {showCategoryAddSection && (
        <AddEditCategorySection
          onClose={() => {
            setShowCateoryAddSection(false);
            handleReset();
          }}
          onSubmit={handleAddCategory}
          formConfig={categoryFormConfig}
          file={file}
          fromRecipe={true}
          setFile={setFile}
          btnLoaders={btnLoaders}
          editCategoryInfo={editCategoryInfo}
        />
      )}
    </div>
  );
};

export default CategorySection;
