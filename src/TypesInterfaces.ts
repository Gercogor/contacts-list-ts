import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store/store";

export interface FormData {
    name: string | null;
    pass: string | null;
    isLogin: boolean;
}

export type InitContactsReducerState = {
    contacts: Array<IContacts>,
    searchedContacts: Array<IContacts>,
    isFetching: boolean,
    search: string,
    sort: [string,boolean]
}

export interface IContacts {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

export interface IEditModal {
    editContact: IContacts;
    visible: boolean;
    setVisible: (boolean: boolean) => void;
    submitEditedData: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChangeEditContact: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type ContactAction = {
    type: string;
    payload: IContacts;
}

export type authAction = {
    type: string;
    payload: boolean;
}

export type AppDispatch = ThunkDispatch<RootState, {}, AnyAction>

