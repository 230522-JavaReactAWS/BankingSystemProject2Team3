import React, { useState } from 'react'
import axios from 'axios';
import "../css/dashboard.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Register: React.FC<any> = () => {

    //useState hooks to declare some state variables that will hold username, password
    const [user,setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const handleChange = (e:any) => {
        setUser({...user, [e.target.name]: e.target.value });
    }

    const registerUser = (e:any) => {
        e.preventDefault();
        axios
            .post('http://ec2-54-86-199-163.compute-1.amazonaws.com/auth/register', {...user})
            .then((response) => {
                console.log('Response', response.data );
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <h3>Register</h3>
            <Form onSubmit={registerUser} className="registerForm">
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter User Name"
                            name="username"
                            onChange={ handleChange }/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter E-mail Address"
                            name="email"
                            onChange={ handleChange }/>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Street Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Street Address"
                        name="streetAddress"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>State:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Zip:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        onChange={ handleChange }/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        onChange={ handleChange }/>
                </Form.Group>
                <Button className="formButton" variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    )
}