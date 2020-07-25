import api from "./api.js";

export const ACTION_TYPES = {
    CREATE: 'CREATE_STOCK_MASTER',
    UPDATE: 'UPDATE_STOCK_MASTER',
    DELETE: 'DELETE_STOCK_MASTER',
    FETCH_ALL: 'FETCH_ALL_STOCK_MASTER'
}

export const fetchAllStocks = () => dispatch => {
    api.postMessage().fetchAllStocks()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))

}
//fetchAllStocks

export const createStock = (data, onSuccess) => dispatch => {
    api.postMessage().createStock(data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const updateStock = (id,data, onSuccess) => dispatch => {
    api.postMessage().update(id,data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const DeleteStock = (id, onSuccess) => dispatch => {
    api.postMessage().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}