import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_CURRENT_USER,
  GET_USER_PROFILE,
  GET_MY_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from "./../constant";
import { product } from "../../assets/products";

const initialState = {
  products: product,
  searchProduct: "",
  user: {},
  myProducts: []
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
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        user: action.payload
      };

    case GET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: [...state.myProducts, action.payload]
      };

    case DELETE_PRODUCT: {
      return {
        ...state,
        myProducts: [
          ...state.myProducts.splice(0, action.payload),
          ...state.myProducts.splice(1)
        ]
      };
    }

    case UPDATE_PRODUCT: {
      return {
        ...state,
        myProducts: [...state.myProducts, action.payload]
      };
    }

    default:
      return state;
  }
}
