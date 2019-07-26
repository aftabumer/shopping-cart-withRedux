import { GET_PRODUCT } from './../constant'

export class productAction {
    static getProduct(payload) {
        return{
            type: GET_PRODUCT,
            payload
        }
    }
}