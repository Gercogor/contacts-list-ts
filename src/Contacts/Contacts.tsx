import ContactCard from '../UI/ContactCard/ContactCard';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Search from '../UI/Search/Search';
import AddContact from '../UI/AddContact/AddContact';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IContacts, InitContactsReducerState } from '../TypesInterfaces';
import { ChangeContact, DeleteContact, emptyContact, setContactsThunk } from '../store/contactsReducer';
import { auth } from '../store/authReducer';
import { RootState } from '../store/store';
import EditModal from '../UI/EditModal/EditModal';
import { useContacts } from '../hooks/useContacts';

const ContactsWrapper = styled('div')({
    position: "relative",
    height: "100vh",
    width: "100vw",
});

const ContactsContainer = styled('div')({
    maxWidth: "450px",
    margin: "0 auto",
    paddingTop: "20px",
    textAlign: "center",
})

const ContactsCardWrapper = styled('div')({
    margin: "0 10px"
});

const Nav = styled('nav')({
    display: "flex",
    justifyContent: "space-between",
});

const Contacts: React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const fullState: InitContactsReducerState = useSelector((state: RootState) => state.contacts)
    const contacts = fullState.contacts;
    const query = fullState.search;

    const [visibleModal, setVisibleModal] = useState(false);

    const [editContact, setEditContact] = useState<IContacts>(emptyContact);

    //переменные для сортировки по разными полям в 2 направления - не реализовано.
    let sort = 'name';
    let direction = false;

    const sortedAndSearchedContacts = useContacts(contacts, sort, direction, query)

    const handleChangeEditContact = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "name") setEditContact({ ...editContact, name: event.target.value })
        if (event.target.name === "phone") setEditContact({ ...editContact, phone: event.target.value })
    }

    const submitEditedData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(ChangeContact(editContact));
        setVisibleModal(false);
    }

    const handleDelete = (contact: IContacts) => {
        let answer = window.confirm('Delete?');
        answer && dispatch(DeleteContact(contact));
    }

    const handleChange = (contact: IContacts) => {
        let [edCon] = (contacts.filter(con => con.id === contact.id));
        setEditContact(edCon);
        setVisibleModal(true);
    }

    const logout = () => {
        dispatch(auth(false))
    }

    useEffect(() => {
        dispatch(setContactsThunk());
    }, [dispatch])

    return (
        <ContactsWrapper>
            <ContactsContainer>
                <Nav>
                    <Link to="/login">To LogIn page</Link>
                    <button onClick={logout}>LogOut</button>
                </Nav>
                <Search />
                <AddContact />
                <ContactsCardWrapper>
                    {
                        sortedAndSearchedContacts.map((contact) =>
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onDelete={() => handleDelete(contact)}
                                onChange={() => handleChange(contact)}
                            />
                        )
                    }
                </ContactsCardWrapper>
            </ContactsContainer>
            <EditModal editContact={editContact} visible={visibleModal} setVisible={setVisibleModal} handleChangeEditContact={handleChangeEditContact} submitEditedData={submitEditedData} />
        </ContactsWrapper>
    )
}

export default Contacts;