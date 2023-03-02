import { Add, Remove } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import CheckoutButton from '../components/CheckoutButton'
import { useNavigate } from 'react-router-dom'
import { addExtraProductToCart, removeProduct } from '../redux/cartRedux'

const Container = styled.div`

`

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "#000" : "transparent"};
  color: ${props => props.type === "filled" && "#fff"};
`

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`

const TopText = styled.span`
  text-decoration: underline;
  text-underline-offset: 1.5px;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span`
  
`

const ProductId = styled.span`
  
`

const ProductColorInfo = styled.span`
  display: flex;
`

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-left: 5px;
`


const ProductSize = styled.span`
  
`

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`

`

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #000;
//   color: #fff;
//   font-weight: 600;
//   margin-top: 15px;
//   cursor: pointer;
// `

const Cart = () => {
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const SHIPPING_AMOUNT_FOR_DISCOUNT = 50
  const SHIPPING_COST = 4.99

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton onClick={() => navigate("/products")}>CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag({cart.quantity})</TopText>
              <TopText>Your Whishlist (0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map(product => (
                 <Product key={`${product._id}${product.color}${product.size}`}>
                 <ProductDetail>
                   <Image src={product.img} />
                   <Details>
                     <ProductName><b>Product: </b>{product.title}</ProductName>
                     <ProductId><b>ID: </b>{product._id}</ProductId>
                     <ProductColorInfo>
                       <b>Color: </b>
                       <ProductColor color={product.color}/>
                     </ProductColorInfo>
                     <ProductSize><b>Size: </b>{product.size}</ProductSize>
                   </Details>
                 </ProductDetail>
                 <PriceDetail>
                   <ProductAmountContainer>
                     <Remove style={{cursor: 'pointer'}} onClick={() => dispatch(removeProduct(product))}/>
                     <ProductAmount>{product.quantity}</ProductAmount>
                     <Add style={{cursor: 'pointer'}} onClick={() => dispatch(addExtraProductToCart(product))} />
                   </ProductAmountContainer>
                   <ProductPrice>€ {product.price * product.quantity}</ProductPrice>
                 </PriceDetail>
               </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>€ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>€ {cart.total > 0 ? SHIPPING_COST : 0}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>- € {(cart.total <= SHIPPING_AMOUNT_FOR_DISCOUNT) ? 0 : SHIPPING_COST}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>€ {(cart.total <= SHIPPING_AMOUNT_FOR_DISCOUNT && cart.total > 0) ? cart.total + SHIPPING_COST : cart.total}</SummaryItemPrice>
              </SummaryItem>
              <CheckoutButton cartItems={cart.products}/>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart