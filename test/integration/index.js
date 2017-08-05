import { createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';

import rx from './instance';

const logger = createLogger();
const store = createStore(
    combineReducers(rx.reducers),
    undefined,
    applyMiddleware(
        apiMiddleware,
        logger
    )
);

store.dispatch(rx.actions.users.get());
// store.dispatch(rx.actions.users.add(null, {
//     name: 'John',
//     surname: 'Doe'
// }));

store.dispatch(rx.actions.users.active('John'));