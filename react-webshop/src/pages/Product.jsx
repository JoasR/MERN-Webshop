import { Add, Remove } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { useLocation } from "react-router-dom"
import { mobile } from '../responsive'
import { useState } from 'react'
import { useEffect } from 'react'
import { publicRequest } from "../requestMethods"
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'

const Container = styled.div`
    
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ flexDirection: "column", padding: "10px" })}
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;   
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
    opacity: ${props => props.color === props.selectedColor ? "1" : "0.5"};
    border: ${props => props.color === props.selectedColor ? "solid 2px #000" : "solid 1px #000"};
    

    &:hover{
        border: 2px solid #000;
        opacity: 1;
    }
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 10px;
`

const FilterSizeOption = styled.option`
    
`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    height: 30px;
    width: 30px;
    border-radius: 10px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: #fff;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("select-size")
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState(false)
    const [selectedColor, setSelectedColor] = useState("")

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id)
                setProduct(res.data)
            } catch (err) {
                //TODO: handle err
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if(type === "decrease"){
            quantity > 1 && setQuantity(quantity -1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleSelectedColor = (color) => {
        setColor(color)
        setSelectedColor(color)
    }

    const handleCLick = () => {
        if(color === "" || size === "select-size"){
            setErrorMessage(true)
        } else {
            setErrorMessage(false)
            dispatch(addProduct({ ...product, quantity, color, size }))
        }
    }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    {product.desc}
                </Desc>
                <Price>€ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map(color => (
                            <FilterColor key={color} color={color} selectedColor={selectedColor} onClick={() => handleSelectedColor(color)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize defaultValue="Select Size" onChange={(e) => setSize(e.target.value)}>
                            <FilterSizeOption disabled key={size}>Select Size</FilterSizeOption>
                            {product.size?.map(size => (
                                <FilterSizeOption key={size}>{size.toUpperCase()}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={() => handleQuantity("decrease")} style={{cursor: "pointer"}}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={() => handleQuantity("increase")} style={{cursor: "pointer"}}/>
                    </AmountContainer>
                    <Button onClick={handleCLick}>ADD TO CART</Button>
                </AddContainer>
                {
                        errorMessage && 
                        <ErrorMessage>
                            Please select size and color
                        </ErrorMessage>
                    }
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Product