import {User} from "../../classes/User";

const defaultState = {user: new User(), isLoading: true, isAuthenticated: false, q: ''};
const setUserReducer = (state = defaultState, action: { type: string, user: User, q: string }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                isLoading: false,
                isAuthenticated: action.user.id !== 0
            };
        case "SEARCH":
            return {
                ...state,
                q: action.q,
            };
        default:
            return state;
    }
}

export default setUserReducer;