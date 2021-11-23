import {User} from "../../classes/User";

const setUserReducer = (state = {user: new User(), isLoading: true}, action: { type: string, user: User }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                isLoading: false
            };
        default:
            return state;
    }
}

export default setUserReducer;