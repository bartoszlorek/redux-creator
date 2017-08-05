import reduxCreator, { noReturn, getJSON } from '../../src/reduxCreator';

const options = {
    rootUrl: 'http://localhost:8080',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export default reduxCreator({
    users: {
        initial: [],
        actions: {
            get: {
                method: 'GET',
                endpoint: '/users',
                success: (action, state, res) => getJSON(res)
            },
            add: {
                method: 'POST',
                endpoint: '/users',
                success: noReturn
            },
            active: null
        },
        reducer: function (state, action) {
            if (action.type === this.active) {
                console.log(action.payload)
            }
            return state;
        }
    }
}, options);