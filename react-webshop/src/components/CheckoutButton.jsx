import React from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { userRequest } from '../requestMethods'

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    font-weight: 600;
    margin-top: 15px;
    cursor: pointer;

    &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
`

const CheckoutButton = ({cartItems}) => {

    const currentUser = useSelector(state => state.user.currentUser)
    console.log(cartItems)

    const handleCheckout = async () => {
        try {
            const res = await userRequest.post("/checkout/create-checkout-session", {
                cartItems,
                userId: currentUser?._id
            })
            window.location.href = res.data.url
        } catch (error) {
            console.log(error.message)   
        }          
    }

  return (
    <Button disabled={cartItems.length === 0} onClick={() => handleCheckout()}>CHECKOUT NOW</Button>
  )
}

export default CheckoutButton