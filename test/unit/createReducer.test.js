import createReducer from '../../src/createReducer';

const initialState = {
    data: [],
    loading: false,
    error: null
};
const types = [
    'users/add/REQUEST',
    'users/add/SUCCESS',
    'users/add/FAILURE'
];
const mockNext = jest.fn((state, action) => state);
const reducer = createReducer(
    initialState,
    types,
    mockNext
);

describe('addData', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toBe(initialState);
    })
    it('handles users/add/SUCCESS', () => {
        const state = reducer(initialState, {
            type: types[1],
            payload: 'John'
        });
        expect(state).not.toBe(initialState);
        expect(state).toEqual({
            data: 'John',
            loading: false,
            error: null
        });
    })
    it('first call passes the initial state', () => {
        expect(mockNext.mock.calls[0][0]).toBe(initialState);
    })
})