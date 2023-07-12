import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import Button from 'react-bootstrap/Button';

export const Auth: React.FC<any> = () => {

    const [authToggle,setAuthToggle] = useState(false)

    const toggleAuth = (input:any) => {
        input.preventDefault()
        if(input.target.name === "login"){
            setAuthToggle( true )
        } else {
            setAuthToggle( false )
        }
    }


    return (
        <div>
            <h1>Auth</h1>
            <div>
                <Button className="formButton" name="register" variant="primary" onClick={toggleAuth}>Register</Button>
                <Button className="formButton" name="login" variant="primary" onClick={toggleAuth}>Login</Button>
            </div>
            <div>
            {authToggle ? (
                <Login/>
            ) : (
                <Register/>
            )}
            </div>
        </div>
    )
}