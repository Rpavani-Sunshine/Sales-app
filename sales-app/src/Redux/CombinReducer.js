import { combineReducers } from 'redux'
import { userReducer } from './userReducer'

export const combinReducer = combineReducers(
    {
        userReducer: userReducer
    }
)