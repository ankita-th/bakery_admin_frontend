import React, { useEffect, useState } from "react";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT } from "../api/endpoints";
import AddEditCategorySection from "./AddEditCategorySection";
import { useForm } from "react-hook-form";
import { editIcon } from "../assets/Icons/Svg";

const CategorySection = ({ formConfig, fieldName, rules }) => {
  const [file, setFile] = useState();
  const { register, watch } = formConfig;
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

  console.log(watch(fieldName), "these ar categories");
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
      method: isEdit ? METHODS?.patch : METHODS?.post,
      update_id: isEdit && item?.id,
      payload: formData,
      instanceType: INSTANCE.formInstance,
      // payload: payload,
    })
      .then((res) => {
        if (isEdit) {
          setCategories(handleEdit(categories, item?.id, res?.data)); //array , id to update , data to update
        } else {
          setCategories((prev) => [...prev, res?.data]);
        }
        toastMessage(
          `Category ${isEdit ? "updated" : "added"} sucessfully`,
          successType
        );
      })
      .catch((err) => {
        toastMessage(handleCategoryErrorToast(err));
      })
      .finally(() => {
        handleReset();
      });
  };
  const handleReset = () => {
    reset();
    setFile(null);
    setBtnLoaders({ publish: false });
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
