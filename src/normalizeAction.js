import { defaults } from 'lodash';

function normalizeAction(prefix, action, options) {
    const __options = defaults(options, {
        headers: null,
        rootUrl: ''
    });

    const callbacks = [
        action.request,
        action.success,
        action.failure
    ];

    return {
        endpoint: __options.rootUrl + action.endpoint,
        types: ['/REQUEST', '/SUCCESS', '/FAILURE'].map((sufix, i) => {
            const type = prefix + sufix;
            const payload = callbacks[i];

            if (typeof payload === 'function') {
                return {
                    type,
                    payload
                }
            }
            return type;
        }),
        headers: __options.headers,
        method: action.method
    }
}

export default normalizeAction;