import addData from '../../src/addData';

const url = 'http://localhost:8080/api/:id/:name';
const withParams = 'http://localhost:8080/api/4/John';

const actionGET = {
    endpoint: url,
    method: 'GET'
}
const actionPOST = {
    endpoint: url,
    method: 'POST'
}
const params = {
    id: 4,
    name: 'John'
}
const otherParams = {
    sex: 'Male'
}
const query = {
    text: 'Hello World!'
}

describe('addData', () => {
    it('returns unchanged action', () => {
        const action = addData(actionGET, null, null);
        expect(action).toBe(actionGET);
    })
    it('adds only params', () => {
        const action = addData(actionGET, params, query);
        expect(action).not.toBe(actionGET);
        expect(action.endpoint).toBe(withParams);
        expect(action.body).toBeUndefined();
    })
    it('adds only query', () => {
        const action = addData(actionPOST, otherParams, query);
        expect(action).not.toBe(actionPOST);
        expect(action.endpoint).toBe(url);
        expect(action.body).toBe(JSON.stringify(query));
    })
})