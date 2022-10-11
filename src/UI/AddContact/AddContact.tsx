import { TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { AddContact, emptyContact } from '../../store/contactsReducer';
import { IContacts } from '../../TypesInterfaces';

const AddContactWrapper = styled('div') ({
    margin: "0 10px",
})


const ContactForm = styled('form')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
});

const ArrowDown = styled('span')({
    border: "solid black",
    borderWidth: " 0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(45deg)",
})

const AddContactBlock: React.FC = () => {

    const dispatch = useDispatch();

    const [contactData, setContactData] = useState<IContacts>(emptyContact);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setContactData({...contactData})
        dispatch(AddContact(contactData));
        setContactData({...emptyContact, id: Math.random(),})
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name==="name") setContactData({...contactData, name:event.target.value})
        if(event.target.name==="phone") setContactData({...contactData, phone:event.target.value})
    }

    return (
        <AddContactWrapper>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDown />}
                    aria-controls="addContact-content"
                    id="addContact-header"
                >
                    <Typography>Add contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ContactForm
                        sx={{mx:'10px'}}
                        onSubmit={event => handleSubmit(event)}
                    >
                        <TextField
                            value={contactData.name}
                            onChange={handleChange}
                            required
                            name="name"
                            id="standard-basic"
                            label="Full Name"
                            type="text"
                            variant="standard"
                            size="small"
                        />
                        <TextField
                            value={contactData.phone}
                            onChange={handleChange}
                            name="phone"
                            id="standard-basic"
                            label="phone"
                            type="text"
                            variant="standard"
                            size="small"
                        />
                        <Button sx={{ m: '0 auto' }} type='submit' variant="contained">Add</Button>
                    </ContactForm>
                </AccordionDetails>
            </Accordion>
        </AddContactWrapper>
    )
}

export default AddContactBlock;