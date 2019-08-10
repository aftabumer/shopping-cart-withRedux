import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_CURRENT_USER,
  GET_USER_PROFILE,
  GET_MY_PRODUCTS,
  SEARCH_PRODUCT
} from "./../constant";
import { product } from "../../assets/products";

const initialState = {
  products: product,
  searchProduct: '',
  user: {},
  myProducts:[]
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
      return{
        ...state,
        user: action.payload
      }

    case GET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: [...state.myProducts, action.payload]
      };

    case SEARCH_PRODUCT: {
      const { searchProduct } = action.payload
      return {
        ...state,
        searchProduct: searchProduct,
        products: searchProduct
          ? product.filter(
              products =>
                products.name
                  .toLowerCase()
                  .indexOf(searchProduct.toLowerCase()) > -1
            )
          : product
      };
    }

    default:
      return state;
  }
}
