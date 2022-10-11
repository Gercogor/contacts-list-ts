import { authAction } from "../TypesInterfaces";

const AUTH = "AUTH";

const initailState = {
    auth: false
}

export const authReducer = (state = initailState, action: authAction) => {
    switch (action.type) {
        case AUTH:
            return { auth: action.payload }
        default:
            return state;
    }
}

export const auth = (payload:boolean) => ({
    type: AUTH,
    payload,
})