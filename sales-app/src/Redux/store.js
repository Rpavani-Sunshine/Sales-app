import { createStore } from 'redux';
import { combinReducer } from './CombinReducer';

export const store = createStore(
    combinReducer
)