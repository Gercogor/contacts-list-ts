import axios from "axios";
import { IContacts, ContactAction, InitContactsReducerState } from "../TypesInterfaces";

const SET_CONTACTS = "SET_CONTACTS";
const ADD_CONTACT = "ADD_CONTACT";
const DELETE_CONTACT = "DELETE_CONTACT";
const CHANGE_CONTACT = "CHANGE_CONTACT";
const SET_SEARCH = "SET_SEARCH";

// const initailState: Array<IContacts> = [{
//     id:1,
//     firstName: "Wooper",
//     lastName: "Dooper",
//     whoIsIt: "",
// }, {
//     id:2,
//     firstName: "Wooper",
//     lastName: "Dooper",
//     whoIsIt: "Coworker",
// }, {
//     id:3,
//     firstName: "Wooper",
//     lastName: "Dooper",
//     whoIsIt: "Coworker",
// }, {
//     id:4,
//     firstName: "123123",
//     lastName: "3456345",
//     whoIsIt: "LOX",
// }]

export const emptyContact = {
    id: Math.random(),
    name: "",
    username: "",
    email: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
            lat: "",
            lng: ""
        }
    },
    phone: "",
    website: "",
    company: {
        name: "",
        catchPhrase: "",
        bs: ""
    }
}

const initialState: InitContactsReducerState = {
    contacts: [],
    searchedContacts: [],
    isFetching: true,
    search: '',
    sort: ['id', false],
}

export const contactsReducer = (state = initialState, action: ContactAction) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                searchedContacts: action.payload,
                isFetching: false,
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload.id)
            }
        case CHANGE_CONTACT:
            let changedContactIndex = state.contacts.findIndex(contact => contact.id === action.payload.id)
            let changedState = [...state.contacts];
            changedState[changedContactIndex] = action.payload;
            return {
                ...state,
                contacts: changedState,
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload,
            }
        default:
            return state;
    }
}

export type ContactsReducer = ReturnType<typeof contactsReducer>


export const setContacts = (contacts: Array<object>) => ({
    type: SET_CONTACTS,
    payload: contacts
})
export const AddContact = (contact: IContacts) => ({
    type: ADD_CONTACT,
    payload: contact,
})

export const DeleteContact = (contact: IContacts) => ({
    type: DELETE_CONTACT,
    payload: contact,

})
export const ChangeContact = (newContact: IContacts) => ({
    type: CHANGE_CONTACT,
    payload: newContact,
})
export const setSearch = (search: string) => ({
    type: SET_SEARCH,
    payload: search,
})
export const setContactsThunk = () => (dispatch: any) => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            dispatch(setContacts(response.data));
        })
}