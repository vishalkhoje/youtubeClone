const initialState = [];

export const cardReducer = (state = initialState, action) => {
    if(action.type === "ADD"){
        return action.payload
    }
    return state;
}