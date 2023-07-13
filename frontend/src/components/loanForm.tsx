import React from 'react';
import { 
    Container, TextField, Button,
    Snackbar
} from '@mui/material';

export default function LoanForm() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container className='loanFormContainer' sx={{display: "flex", flexDirection: "column", width: {md: "70%"}, gap: "0.5em"}}>
            <h3>Apply for a Loan</h3>
            <TextField disabled variant='filled' label='Type: Loan' size='small' />
            <TextField disabled variant='filled' label='Rafael Lopez' size='small' />
            <TextField disabled variant='filled' label='1943 Baxter Ave' size='small' />
            <TextField disabled variant='filled' label='Velheim, NC 10432' size='small' />
            <TextField color='warning' variant='standard' type='number' label='Loan Amount' placeholder='Enter Amount' size='small' />
            <br />
            <Button onClick={handleOpen} color='warning'>Submit Application</Button>
            <Snackbar 
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={open}
                onClose={handleClose}
                message="Application successfully submitted"
            />
        </Container>
    )
}