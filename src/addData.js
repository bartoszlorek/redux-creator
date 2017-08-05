import addParams from './addParams';
import allowQuery from './allowQuery';

function addData(action, params, query) {
    const withParams = addParams(action.endpoint, params);
    let copy = null;

    if (action.endpoint !== withParams) {
        copy = assign(copy, action);
        copy.endpoint = withParams;
    }
    if (allowQuery(action, query)) {
        copy = assign(copy, action);
        copy.body = JSON.stringify(query);
    }
    return copy ? copy : action;
}

function assign(target, source) {
    return target ? target : Object.assign({}, source);
}

export default addData;