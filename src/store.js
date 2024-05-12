import { createStore } from 'redux';

const initialState = {
    activeSymptomsList: { area: null, activeSymptomsList: [] },
};
//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVE_SYMPTOMS_LIST':
            return {
                ...state,
                activeSymptomsList: action.payload,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
