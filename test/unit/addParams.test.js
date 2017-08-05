import addParams from '../../src/addParams';

const url = 'http://localhost:8080/api/:id/:name';
const withParams = 'http://localhost:8080/api/4/John';

describe('addParams', () => {
    it('returns unchanged url', () => {
        [
            undefined,
            null,
            [2],
            {},
            { sex: 'Male' }

        ].forEach(params => {
            expect(addParams(url, params)).toBe(url)
        });
    })
    it('returns url with params', () => {
        const params = { id: 4, name: 'John' };
        expect(addParams(url, params)).toBe(withParams);
    })
})