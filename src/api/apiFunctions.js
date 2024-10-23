import { cleanFilters } from "../utils/helpers";
import { authAxios, authorizeAxios } from "./apiConfig";

export const login = (payload) => {
  return authAxios.post("/register", payload);
};

//  products flow
export const getProducts = (filters) => {
  // for removing filter keys from an object whose values are empty and further implementing encodingURIComponent
  const cleanedFilters = cleanFilters(filters);
  return authorizeAxios.get("/product/products/", { params: cleanedFilters });
};

export const deleteProduct = (id) => {  
  return authorizeAxios.delete(`/product/products/${id}/`);
};

export const METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const makeApiRequest = async ({
  endPoint,
  method,
  params,
  payload,
  instanceType = INSTANCE.auth,
}) => {
  try {
    console.log("payload: ", payload, "endpoint: ", endPoint);
    let API_INSTANCE = null;
    if (instanceType === INSTANCE.auth) {
      API_INSTANCE = authAxios;
    } else if (instanceType === INSTANCE.formInstance) {
      API_INSTANCE = authorizeFileInstance;
    } else {
      API_INSTANCE = authorizeAxios;
    }

    switch (method) {
      case METHODS.get: {
        const config = params ? { params: { ...params } } : {};
        return await API_INSTANCE.get(endPoint, config);
      }

      case METHODS.post: {
        return await API_INSTANCE.post(endPoint, { ...payload });
      }

      case METHODS.put: {
        return await API_INSTANCE.put(endPoint, { ...payload });
      }

      case METHODS.patch: {
        return await API_INSTANCE.patch(endPoint, { ...payload });
      }

      case METHODS.delete: {
        return await API_INSTANCE.delete(endPoint);
      }

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
};
