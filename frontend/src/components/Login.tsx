import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from 'axios'

export const Login: React.FC<any> = () => {

    //useState hooks to declare some state variables that will hold username and password
    const [user,setUser] = useState({
        username: '',
        password: '',
    });

    //we need useNavigate to allow us to navigate between components... no more manual URL changing!!
    const navigate = useNavigate()

    /* when the user updates the username OR password, this will be called thanks to onChange below 
    the username OR password state variables will get updated based on the name of the input that's changing*/
    const handleChange = (e:any) => {
        setUser({...user, [e.target.name]: e.target.value });
    }


    //this function will gather the user input for username/password, and send a POST request to our backend
    const login = async () => {

        //send an HTTP POST request with axios, and store the response in a variable that we can use
        const response = await axios
            .post("http://localhost:8080/auth/login", {...user})
            .then((response) => {
                //if the login was successful, log the user in and store the JWT
                sessionStorage.setItem("username", user.username)
                sessionStorage.setItem("token", response.data.accessToken)

                console.log( sessionStorage.getItem("username") );
                console.log( sessionStorage.getItem("token") );
                
                //we can use the useNavigate variable above to switch URLs (thus switching components)
                navigate("/accounts")
            }
        )
        .catch((error) => {
            alert("Login failed! Please try again...")
        })
    }

    return(
        <div className="login">

            <div className="text-container">
                <h1>Welcome to RevaTrust Banking!</h1>
                <h3>Login</h3>

                <div className="input-container">
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                </div>

                <button className="login-button" onClick={login}>Login</button>
            </div>

        </div>
    )
}