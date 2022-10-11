import React from 'react'
import { IEditModal } from '../../TypesInterfaces';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';

const EditModalWrapper = styled('div')({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)"
});
const EditModalInner = styled('div')({
    position: "relative",
    top: "15%",
    margin: "20px auto",
    padding: "40px 20px",
    maxWidth: "35%",
    minWidth: "320px",
    borderRadius: "15px",
    backgroundColor: "white",
});
const ContactForm = styled('form')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
});


const EditModal: React.FC<IEditModal> = ({ editContact, visible, setVisible, submitEditedData, handleChangeEditContact }) => {

    const changeVisability = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        (e.target as HTMLDivElement).id === "modalWrapper" && setVisible(false);
    }

    return (
        <EditModalWrapper id="modalWrapper" onClick={(e) => changeVisability(e)} style={visible ? { display: "block" } : { display: "none" }}>
            <EditModalInner>
                <p style={{marginTop: "0px"}}>Edit contact</p>
                <ContactForm action="" onSubmit={(event) => submitEditedData(event)}>
                    <TextField
                        value={editContact.name}
                        onChange={handleChangeEditContact}
                        required
                        name="name"
                        id="standard-basic"
                        label="Full Name"
                        type="text"
                        variant="standard"
                        size="small"
                    />
                    <TextField
                        value={editContact.phone}
                        onChange={handleChangeEditContact}
                        name="phone"
                        id="standard-basic"
                        label="Phone"
                        type="text"
                        variant="standard"
                        size="small"
                    />
                    <Button sx={{ m: '0 auto' }} type='submit' variant="contained">Save changes</Button>
                </ContactForm>
            </EditModalInner>
        </EditModalWrapper>
    )
}

export default EditModal;