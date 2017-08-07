import { apiMiddleware, CALL_API, getJSON } from 'redux-api-middleware';
import { isPlainObject } from 'lodash';
import normalizeAction from './normalizeAction';
import createReducer from './createReducer';
import addData from './addData';

function reduxCreator(reducers, options) {
    const __reducers = {};
    const __actions = {};

    if (!isPlainObject(reducers)) {
        throw 'First parameter must be a plain object.';
    }

    for (let reducerName in reducers) {
        const { initial, actions, reducer } = reducers[reducerName];

        if (!isPlainObject(actions)) {
            throw 'Actions must be a plain object.';
        }
        if (reducer && typeof reducer !== 'function') {
            throw 'Reducer must be a function.';
        }

        const reducerPrefix = `@@api/${reducerName}/`;
        const localActions = {};
        const initialState = {
            data: initial ? initial : {},
            loading: false,
            error: null
        }

        let currentReducer = bind(reducer, localActions);
        __reducers[reducerName] = {};
        __actions[reducerName] = {};

        for (let actionName in actions) {
            const actionObject = actions[actionName];
            const actionPrefix = reducerPrefix + actionName;

            // server or local action
            if (actionObject && actionObject.endpoint) {
                const normalized = normalizeAction(
                    actionPrefix,
                    actionObject,
                    options
                );

                __actions[reducerName][actionName] = (params, body) => ({
                    [CALL_API]: addData(normalized, params, body)
                });

                currentReducer = createReducer(
                    initialState,
                    normalized.types,
                    currentReducer
                );

            } else {
                localActions[actionName] = actionPrefix;

                if (typeof actionObject === 'function') {
                    __actions[reducerName][actionName] = (data) => ({
                        type: actionPrefix,
                        payload: actionObject(data)
                    });

                } else {
                    __actions[reducerName][actionName] = (data) => ({
                        type: actionPrefix,
                        payload: data
                    });
                }
            }
        }
        __reducers[reducerName] = currentReducer;
    }

    return {
        reducers: __reducers,
        actions: __actions
    }
}

function bind(target, source) {
    if (typeof target === 'function') {
        return target.bind(source);
    }
    return target;
}

export default reduxCreator;
export const noReturn = () => { };
export { apiMiddleware, getJSON }