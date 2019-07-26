import {GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE} from './../constant'
import {products} from '../../assets/products'

const initialState = {
    products: [],
    product: products,
    getProductsLoader: false,
    getProductsError: false,
}

export default function productReducer(state= initialState, action){
    switch(action.type) {
        case GET_PRODUCT:
            return{
                ...state,
                products: [...state.products, action.payload],
            }
        case GET_PRODUCT_SUCCESS:
            return{

            }
        case GET_PRODUCT_FAILURE:
            return{

            }

        default:
            return state

    }
}