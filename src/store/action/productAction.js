import { ADD_PRODUCT, GET_PRODUCT, GET_CURRENT_USER, GET_USER_PROFILE, GET_MY_PRODUCTS, SEARCH_PRODUCT } from './../constant'

export class productAction {
    static addProduct(payload) {
        return{
            type: ADD_PRODUCT,
            payload
        }
    }

    static getProduct(payload) {
        return{
            type: GET_PRODUCT,
            payload
        }
    }

    static getUserProfile(payload) {
        return{
            type: GET_USER_PROFILE,
            payload
        }
    }

    static getCurrentUser(payload) {
        return{
            type: GET_CURRENT_USER,
            payload
        }
    }

    static getMyProducts(payload) {
        return{
            type: GET_MY_PRODUCTS,
            payload
        }
    }

    static searchProduct(payload) {
        return{
            type: SEARCH_PRODUCT,
            payload
        }
    }
}