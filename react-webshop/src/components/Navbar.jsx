import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "../redux/userRedux"

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

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity) // state.cart is from the store.js
    const currentUser = useSelector(state => state.user.currentUser) 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

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
            <Center><Logo>FRISK.</Logo></Center>    
            <Right>
                {currentUser 
                    ?   <Dropdown className="dropdown">
                            <MainMenuItem>{(currentUser.username).toUpperCase()}</MainMenuItem>
                            <DropdownContent className="dropdown-content">
                                <MenuItemContainer onClick={handleLogout}> 
                                    <MenuItem>LOGOUT</MenuItem>
                                </MenuItemContainer>
                            </DropdownContent>
                        </Dropdown>
                    :   <>
                            <MenuItem>REGISTER</MenuItem>    
                            <MenuItem>SIGN IN</MenuItem>
                        </>
                }
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined style={{color: "000"}}/>
                        </Badge>
                    </MenuItem>    
                </Link>
            </Right>    
        </Wrapper>
    </Container>
  )
}

export default Navbar
