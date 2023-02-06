import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/apiCalls"
import "./login.css"



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
        setIsClicked(true)
    }
    return (
        <div className='loginContainer'>
            <h1 className='loginTitle'>Webshop Admin Panel. Please Login as Admin.</h1>
            <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)}/>
            <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)}/>
            {
                (user.error && isClicked) &&
                <span className='errorMessage'>{user.error}</span>
            }
            <button className='loginButton' disabled={user.isFetching} onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login