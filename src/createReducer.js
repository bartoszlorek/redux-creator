function createReducer(initialState, types, next) {
    const typeNames = types.map(a => a.type ? a.type : a);
    const isNext = typeof next === 'function';

    return (state = initialState, action) => {
        const { type, payload } = action;

        if (type === typeNames[0]) {
            return {
                ...state,
                loading: true
            }
        }

        if (payload !== undefined) {
            if (type === typeNames[1]) {
                return {
                    ...state,
                    data: payload,
                    loading: false
                }
            }

            if (type === typeNames[2]) {
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
            }
        }

        return isNext
            ? next(state, action)
            : state;
    }
}

export default createReducer;