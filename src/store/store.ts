import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "./authReducer";
import { contactsReducer } from "./contactsReducer";

const rootReducer = combineReducers({
    contacts: contactsReducer,
    auth: authReducer,
});


let store = createStore(rootReducer, applyMiddleware(thunk));


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;