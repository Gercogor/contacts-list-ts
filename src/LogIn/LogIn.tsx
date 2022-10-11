import React, { useState } from 'react'
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { FormData } from "../TypesInterfaces";
import { useDispatch } from 'react-redux';
import { auth } from '../store/authReducer';


const FormWrapper = styled('div')({
    position: "relative",
    width: "300px",
    margin: "10px auto",
    textAlign: "center",
});

const LinkWrapper = styled('div')({
    position: "absolute",
    left: "5%",
    top: "1%",
});

const Form = styled('form')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
});

const LogIn: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({ name: null, pass: null, isLogin: false });

    const dispatch = useDispatch()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(auth(formData.isLogin))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "name") setFormData({ ...formData, name: event.target.value })
        if (event.target.name === "pass") setFormData({ ...formData, pass: event.target.value })
        if (event.target.name === "isLogin") setFormData({ ...formData, isLogin: event.target.checked })
    }

    return (
        <FormWrapper>
            <p>Please LogIn to continue...</p>
            <Form
                onSubmit={event => handleSubmit(event)}
            >
                <TextField
                    defaultValue={formData.name}
                    onChange={handleChange}
                    required
                    name="name"
                    id="outlined-required"
                    label="Login"
                    type="text"
                />
                <TextField
                    defaultValue={formData.pass}
                    onChange={handleChange}
                    required
                    name="pass"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                />
                <label htmlFor="checkbox">
                    Success login
                    <input name='isLogin' onChange={handleChange} checked={formData.isLogin} id='checkbox' type="checkbox" />
                </label>
                <Button sx={{ m: '0 auto' }} type='submit' variant="contained">LogIn</Button>
            </Form>
            <LinkWrapper>
                <Link style={{ textDecoration: 'none' }} to="/">&#5176;&#5176;</Link>
            </LinkWrapper>
        </FormWrapper>

    )
}

export default LogIn;

