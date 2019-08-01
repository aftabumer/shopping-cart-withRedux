import { ADD_PRODUCT, GET_PRODUCT } from './../constant'

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
}