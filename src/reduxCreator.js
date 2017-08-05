import { CALL_API, getJSON } from 'redux-api-middleware';
import normalizeAction from './normalizeAction';
import createReducer from './createReducer';
import addData from './addData';

function reduxCreator(reducers, options) {
    const __reducers = {};
    const __actions = {};

    for (let reducerName in reducers) {
        const reducer = reducers[reducerName];
        const { initial, actions } = reducer;
        const reducerMethod = reducer.reducer;
        const reducerPrefix = `@@api/${reducerName}/`;

        const initialState = {
            data: initial ? initial : {},
            loading: false,
            error: null
        }

        __reducers[reducerName] = {};
        __actions[reducerName] = {};
        const localActions = {};

        let currentReducer = reducerMethod;
        if (typeof reducerMethod === 'function') {
            currentReducer = reducerMethod.bind(localActions);
        }

        for (let actionName in actions) {
            const action = actions[actionName];
            const actionPrefix = reducerPrefix + actionName;

            // server or local action
            if (action && action.endpoint) {
                const normalized = normalizeAction(
                    actionPrefix,
                    action,
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

                if (typeof action === 'function') {
                    __actions[reducerName][actionName] = (data) => ({
                        type: actionPrefix,
                        payload: action(data)
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

export default reduxCreator;
export const noReturn = () => { };
export { getJSON }