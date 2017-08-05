import { isPlainObject } from 'lodash';

function allowQuery(action, query) {
    return action.method !== 'GET'
        && action.method !== 'HEAD'
        && isPlainObject(query);
}

export default allowQuery;