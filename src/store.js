import { createStore } from 'redux';

const initialState = {
    activeSymptoms: { area: null, activeSymptoms: [] },
};
//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVE_SYMPTOMS':
            return {
                ...state,
                activeSymptoms: action.payload,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
