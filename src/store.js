import { createStore, compose } from 'redux';

import reducer from './reducers';

const LogEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        return originalDispatch(action);
    }
    return store;
}

const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if(typeof action === 'string') {
            originalDispatch({
                type: action
            })
        }
        return originalDispatch(action);
    }
    return store;
}

const store = createStore(reducer, compose(stringEnhancer, LogEnhancer));

store.dispatch('HELLO_WORLD');
export default store;
