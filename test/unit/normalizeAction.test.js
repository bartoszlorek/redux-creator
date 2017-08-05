import normalizeAction from '../../src/normalizeAction';

const prefix = 'users';
const successMethod = () => { };

const action = {
    method: 'GET',
    endpoint: '/users',
    success: successMethod
}
const options = {
    rootUrl: 'http://localhost:8080/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

describe('normalizeAction', () => {
    const normalized = normalizeAction(prefix, action, options);

    it('returns new action', () => {
        expect(normalized).not.toBe(action);
    })
    it('normalizes types', () => {
        expect(normalized.types[0]).toBe('users/REQUEST');
        expect(normalized.types[2]).toBe('users/FAILURE');
        expect(normalized.types[1]).toEqual({
            type: 'users/SUCCESS',
            payload: successMethod
        });
    })
    it('adds rootUrl', () => {
        expect(normalized.endpoint).toBe(options.rootUrl + '/users');
    })
    it('adds headers', () => {
        expect(normalized.headers).toBe(options.headers);
    })
})