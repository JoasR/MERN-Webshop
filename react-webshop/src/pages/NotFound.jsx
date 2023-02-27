import React from 'react'
import styled from "styled-components"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const NotFoundContainer = styled.div `
    height: 50%;
    width: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: rgb(68, 68, 68);
`

const ErrorCode = styled.h2`
    font-size: 55px;
`

const PageNotFound = styled.p`
    font-size: 30px;
`

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
`

const NotFound = () => {
  return (
    <>
        <Navbar />
        <NotFoundContainer>
            <ErrorCode>404</ErrorCode>
            <PageNotFound>Page not found</PageNotFound>
        </NotFoundContainer>
        <FooterContainer>
            <Footer />
        </FooterContainer>
    </>
  )
}

export default NotFound