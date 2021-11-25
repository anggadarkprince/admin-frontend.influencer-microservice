import {User} from "../../classes/User";

const defaultState = {user: new User(), isLoading: true, isAuthenticated: false};
const setUserReducer = (state = defaultState, action: { type: string, user: User }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                isLoading: false,
                isAuthenticated: action.user.id !== 0
            };
        default:
            return state;
    }
}

export default setUserReducer;