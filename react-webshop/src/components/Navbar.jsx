import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "../redux/userRedux"
import { loadCart, saveCart } from '../localstorage/cartLocalStorage'
import { clearCart, setCart } from '../redux/cartRedux'

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ justifyContent: "center", flex: "2" })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const MainMenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    padding: 10px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const MenuItemContainer = styled.div`
    cursor: pointer;
    padding: 10px 0px;

    &:hover{
        background-color: teal;
        color: #fff;
    }
`

const Dropdown = styled.div`
  position: relative;

  &:hover .dropdown-content {
    display: block;
  }
`

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 35px;
  right: 0px;
  background-color: white;
  min-width: 160px;
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  pointer-events: none; /* Disable pointer events so that the cursor can pass through */
  
  ${Dropdown}:hover & {
    display: block;
    pointer-events: auto; /* Enable pointer events when the dropdown is hovered */
  }
`

const NavbarLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const Hr = styled.hr`
    color: lightgray;
    opacity: 0.5;
    width: 80%;
    margin: 5px auto;
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity) // state.cart is from the store.js
    const currentUser = useSelector(state => state.user.currentUser) 
    const userCart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(clearCart())
        dispatch(logout())
        navigate("/")
    }

    useEffect(() => {
        if (currentUser) {
          const savedCart = loadCart(currentUser._id);
          dispatch(setCart(savedCart));
        }
      }, [currentUser, dispatch]);
    
      useEffect(() => {
        if (currentUser && userCart) {
          saveCart(currentUser._id, userCart);
        }
      }, [currentUser, userCart]);

    return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language> 
                <SearchContainer>
                    <Input placeholder='Search'/>
                    <Search style={{color: "gray", fontsize: "16px"}}/> 
                </SearchContainer>   
            </Left>   
            <NavbarLink style={{textDecoration: "none"}} to="/"> 
                <Center><Logo>FRISK.</Logo></Center>    
            </NavbarLink>
            <Right>
                {currentUser 
                    ?   <Dropdown className="dropdown">
                            <MainMenuItem>{(currentUser.username).toUpperCase()}</MainMenuItem>
                            <DropdownContent className="dropdown-content">
                                <MenuItemContainer> 
                                    <MenuItem>MY FAVOURITES</MenuItem>
                                </MenuItemContainer>
                                <MenuItemContainer> 
                                    <MenuItem>MY ORDERS</MenuItem>
                                </MenuItemContainer>
                                <MenuItemContainer> 
                                    <MenuItem>MY ACCOUNT</MenuItem>
                                </MenuItemContainer>
                                <Hr />
                                <MenuItemContainer onClick={handleLogout}> 
                                    <MenuItem>LOGOUT</MenuItem>
                                </MenuItemContainer>
                            </DropdownContent>
                        </Dropdown>
                    :   <>
                            <NavbarLink style={{textDecoration: "none"}} to="/register">
                                <MenuItem>REGISTER</MenuItem>    
                            </NavbarLink>
                            <NavbarLink style={{textDecoration: "none"}} to="/login">
                                <MenuItem>SIGN IN</MenuItem>
                            </NavbarLink>
                        </>
                }
                <NavbarLink to="/cart">
                    <MenuItem style={{marginRight: "15px"}}>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined style={{color: "000"}}/>
                        </Badge>
                    </MenuItem>    
                </NavbarLink>
            </Right>    
        </Wrapper>
    </Container>
  )
}

export default Navbar
