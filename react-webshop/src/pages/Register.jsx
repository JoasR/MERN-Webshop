import React, { useEffect } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useState } from "react"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
    center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
`

const Input = styled.input`
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;

    &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
`

const ErrorMessage = styled.span`
    font-size: 12px;
    color: red;
`

const InputWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 40%;
`

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [focusFirstName, setFocusFirstName] = useState(false)
    const [focusLastName, setFocusLastName] = useState(false)
    const [focusUsername, setFocusUsername] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)

      useEffect(() => {
        function validateForm() {
            // Check if all the required fields are filled out
            if (
              firstName.trim() === '' ||
              lastName.trim() === '' ||
              username.trim() === '' ||
              email.trim() === '' ||
              password.trim() === '' ||
              confirmPassword.trim() === ''
            ) {
              // If any of the required fields are empty, the form is not valid
              setIsFormValid(false);
            } else if (username.trim().length < 3 || username.trim().length > 16) {
              // If the username is too short or too long, the form is not valid
              setIsFormValid(false);
            } else if (!isValidEmail(email)) {
              // If the email is not valid, the form is not valid
              setIsFormValid(false);
            } else if (password !== confirmPassword) {
              // If the passwords do not match, the form is not valid
              setIsFormValid(false);
            } else if (!isValidPassword(password)) {
              // If the password is not valid, the form is not valid
              setIsFormValid(false);
            } else {
              // If all the required fields are filled out and the additional validations pass, the form is valid
              setIsFormValid(true);
            }
          }
          validateForm()
      }, [password, email, username, firstName, lastName, confirmPassword, isFormValid])
      
      function isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
        return passwordRegex.test(password);
      }
      
      function handleChangeFirstName(e) {
        setFirstName(e.target.value);
      }
      
      function handleChangeLastName(e) {
        setLastName(e.target.value);
      }
      
      function handleChangeUsername(e) {
        setUsername(e.target.value);
      }
      
      function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
      
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }
      
      function handleChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
      }
      
      function isValidEmail(email) {
        // A basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    const handleFirstNameFocus = (e) => {
        setFocusFirstName(true)
    }
    const handleLastNameFocus = (e) => {
        setFocusLastName(true)
    }
    const handleUsernameFocus = (e) => {
        setFocusUsername(true)
    }
    const handleEmailFocus = (e) => {
        setFocusEmail(true)
    }
    const handlePasswordFocus = (e) => {
        setFocusPassword(true)
    }
    const handleConfirmPasswordFocus = (e) => {
        setFocusConfirmPassword(true)
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log("account created successfully: " + firstName + lastName + email + username + password + confirmPassword)
    }

    //this validations only happen when the button is clicked. can you make it so these validations are done live, so ill instantly see the alerts as soon as the user uses the inputs?
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <InputWrapper>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleChangeFirstName}
                    name="first_name"
                    required
                    onBlur={handleFirstNameFocus}
                />
                {(firstName.trim() === '' && focusFirstName) && <ErrorMessage>Please enter your first name.</ErrorMessage>}
                </InputWrapper>
                <InputWrapper>
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleChangeLastName}
                    name="last_name"
                    required
                    onBlur={handleLastNameFocus}
                />
                {(lastName.trim() === '' && focusLastName) && <ErrorMessage>Please enter your last name.</ErrorMessage>}
                </InputWrapper>
                <InputWrapper>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                    name="username"
                    required
                    onBlur={handleUsernameFocus}
                />
                {((username.trim() === '' || username.trim().length < 3 || username.trim().length > 16) && focusUsername) && (
                    <ErrorMessage>
                    Username must be between 3 and 16 characters.
                    </ErrorMessage>
                )}
                </InputWrapper>
                <InputWrapper>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                    name="email"
                    required
                    onBlur={handleEmailFocus}
                />
                {(!isValidEmail(email) && focusEmail) && <ErrorMessage>Please enter a valid email address.</ErrorMessage>}
                </InputWrapper>
                <InputWrapper>
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                    name="password"
                    required
                    onBlur={handlePasswordFocus}
                />
                {(!isValidPassword(password) && focusPassword) && (
                    <ErrorMessage>Password should be atleast be 6 characters long and contain atleast 1 number and 1 capitalised letter.</ErrorMessage>
                )}
                </InputWrapper>
                <InputWrapper>
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    name="confirm_password"
                    required
                    onBlur={handleConfirmPasswordFocus}
                />
                {(password !== confirmPassword && focusConfirmPassword) && (
                    <ErrorMessage>The passwords do not match.</ErrorMessage>
                )}
                </InputWrapper>
                <Agreement>
                By creating an account, I consent to the processing of my personal data in accordance with the{' '}
                <b>PRIVACY POLICY</b>
                </Agreement>
                <Button disabled={!isFormValid} onClick={handleClick}>
                CREATE
                </Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register