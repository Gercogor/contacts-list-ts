import React from 'react'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { IContacts } from '../../TypesInterfaces';

const CardWrapper = styled('div')({
    position: "relative",
    margin: "10px auto",
    textAlign: "center",
});

function stringToColor(string: string) {
    let hash = 0;
    let i: number;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

interface IContactsCard {
    contact: IContacts;
    onDelete: () => void;
    onChange: () => void;
}


const ContactCard: React.FC<IContactsCard> = ({ contact, onDelete, onChange }) => {

    return (
        <CardWrapper>
            <Card sx={{ maxWidth: 450 }}>
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(`${contact.name}`)} />
                    }
                    action={
                        <div>
                            <IconButton onClick={onChange}>
                                &#9881;
                            </IconButton>
                            <IconButton onClick={onDelete}>
                                &#128465;
                            </IconButton>
                        </div>
                    }
                    title={`${contact.name}`}
                    subheader={contact.phone}
                />
            </Card>
        </CardWrapper>
    )
}

export default ContactCard;


