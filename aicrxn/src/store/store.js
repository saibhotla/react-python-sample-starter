
import { createStore } from 'redux';

const initialState = {
    loggedin: false
};

const store = createStore(initialState);

export default store;
