import {
  ADD_PRODUCT,
  GET_PRODUCT,

  GET_PRODUCT_FAILURE
} from "./../constant";
import { product } from "../../assets/products";

const initialState = {
  products: product,
  // getProductsLoader: false,
  // getProductsError: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
        
      };


    case GET_PRODUCT_FAILURE:
      return {};

    default:
      return state;
  }
}
