import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { mobile } from '../responsive'
import { Link } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
     center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #fff;
    ${mobile({ width: "75%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 5px;

    &:disabled{
        color: teal;
        cursor: not-allowed;
    }
`

const LinkMessage = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const RedirectLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const Error = styled.span`
    color: red;
    font-size: 14px;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password }) // from /redux/apiCalls.js
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error &&
                        <Error>{error}</Error> 
                    }
                    <LinkMessage>FORGOT PASSWORD?</LinkMessage>
                    <RedirectLink to="/register">
                        <LinkMessage>NEW HERE? CREATE A NEW ACCOUNT NOW</LinkMessage>
                    </RedirectLink>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login