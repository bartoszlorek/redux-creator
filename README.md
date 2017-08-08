# redux-creator

## Local Actions
Flux Standard Action Creator and Reducer

```javascript
function addTodo(data) {
    return {
        type: 'ADD_TODO',
        payload: data
    }
}

function todoReducer(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return [...state, action.payload];
    }
    return state;
}
```

`redux-creator` Style

```javascript
reduxCreator({
    todos: {
        initial: [],
        actions: {
            add: (data) => data // null does the same
        },
        reducer: function (state, action) {
            if (action.type === this.add) {
                return [...state, action.payload];
            }
            return state;
        }
    }
})
```
Important! Inside `reducer` function `this` refers to object contains all Local Action type names.

## Server Actions
The real benefits are gained by using Server Actions. Under the hood it's a [redux-api-middleware](https://github.com/agraboso/redux-api-middleware) in `redux-creator` style. It's easy to combine both types of actions and our app is DRY. For example load `GET` todos from RESTful API. Creator makes all necessary actions: `request`, `success`, `failure` and bind them to reducer (creating own reducer is only for local actions, but it can be mixed).

```javascript
reduxCreator({
    todos: {
        initial: [],
        actions: {
            load: {
                method: 'GET',
                endpoint: 'http://localhost:8080/api/todos',
                success: (action, state, res) => getJSON(res)
            }
        }
    }
})
```

## Finally
After all `redux-creator` returns an object contains all `reducers` and `actions` (grouped according to reducers).

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxCreator, { apiMiddleware } from 'redux-creator';

const rx = reduxCreator(...);
const reducer = combineReducers(rx.reducers);
const store = createStore(reducer, applyMiddleware(apiMiddleware));

store.dispatch(rx.actions.todos.load());
```

## Parameters

```javascript
reduxCreator( reducers, options )
```

**reducers**

```javascript
{
    reducerName: {
        initial // [Mixed] state for reducer [default Object]
        reducer // [Function] for local actions
        actions: {
            localActionName // [Function or Null] returns data for payload
            serverActionName {
                // required
                method // [String] HTTP methods,
                endpoint // [String] URL to resources
                
                // optional
                success // [Function] returns payload after successfully call
                request // [Function] like a succes but after request call
                failure // [Function] like a succes but after failure call
            }
        }
    },
    ...
}
```
Callbacks `success`, `request` and `failure` are called with arguments `action`, `state` and `response`. When function returns `undefined` payload is ignoring. This is useful when we send `POST` method, but we do not want the response to interfere with the `store`.

**options**
```javascript
{
    // optional
    rootUrl // [String] URL to resources placed before each endpoint
    headers // [Object] Additional header key/value pairs to send along with requests
}
```
