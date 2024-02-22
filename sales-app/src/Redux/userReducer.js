//  Define Initial State 
const InitialState = {
    user: {}
}
export const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, user: action.payload
            };
        case "LOGOUT":
            return InitialState;
        default :
        return InitialState;
    }
}
