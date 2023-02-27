import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { CheckCircleOutline } from '@mui/icons-material';

const TextContainer = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const SuccessText = styled.div`
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
`

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
`

const CheckoutSuccess = () => {
  return (
    <>
        <Announcement />
        <Navbar />
        <TextContainer>
            <SuccessText>Payment successfull, thank you for your purchase! You will be redirected shortly. <br /> Please do not close this page.</SuccessText>
            <CheckCircleOutline style={{color: "green", height: "40%", width: "40%"}} />
        </TextContainer>
        <FooterContainer>
            <Footer />
        </FooterContainer>
    </>
  )
}

export default CheckoutSuccess