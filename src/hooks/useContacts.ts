import { useMemo } from "react";
import { IContacts } from "../TypesInterfaces";

export const useSortedContacts = (contacts: Array<IContacts>, sort: string, direction: boolean) => {
    const sortedContacts = useMemo(() => {
        if (sort === 'name') {
            let newContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name))
            return direction? newContacts.reverse() : newContacts;
        } else if (sort === 'body') {
            let newContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name))
            return direction? newContacts.reverse() : newContacts;
        } else {
            let newContacts = [...contacts].sort((a, b) => a.id - b.id)
            return direction? newContacts.reverse() : newContacts;
        }
    }, [sort, contacts, direction]);
    return sortedContacts;
}

export const useContacts = (contacts: Array<IContacts>, sort: string, direction: boolean, query: string) => {
    const sortedContacts = useSortedContacts (contacts, sort, direction);
    const sortedAndSearchedContacts = useMemo(() => {
        return sortedContacts.filter(contact => contact.name.toLowerCase().includes(query))
    }, [query, sortedContacts])
    return sortedAndSearchedContacts;
}