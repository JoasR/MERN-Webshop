import React from 'react'
import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Container = styled.div`

`

const Title = styled.h1`
    margin: 20px;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    margin: 20px;
    ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`

const Option = styled.option`

`

const ProductList = () => {
    const location = useLocation() //Gives the location, console log location to see what it gives
    const cat = location.pathname.split("/")[2]
    const [filters, setfilters] = useState({})
    const [sort, setSort] = useState("newest")

    const handleFilters = (e) => {
        const {value, name} = e.target //remember from scrimba react inputs
        setfilters({
            ...filters,
            [name]: value
        })
    }

    const toUpperCaseEachWord = (str) => {
        return str.toLowerCase()
            .split(' ')
            .map(word => 
                word.charAt(0).toUpperCase() 
                + word.substring(1)).join(' ')
    }
    
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{ toUpperCaseEachWord(cat) }</Title>
        <FilterContainer>
            <Filter>
                <FilterText></FilterText>
                <Select name='color' defaultValue="all-colors" onChange={handleFilters}>
                    <Option value="all-colors">
                        All Colors
                    </Option>
                    <Option value="white">White</Option>
                    <Option value="black">Black</Option>
                    <Option value="red">Red</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="yellow">Yellow</Option>
                    <Option value="green">Green</Option>
                    <Option value="golden">Golden</Option>
                    <Option value="gray">Gray</Option>
                </Select>
                <Select name='size' defaultValue="all-sizes" onChange={handleFilters}>
                    <Option value="all-sizes">
                        All Sizes
                    </Option>
                    <Option value="XS">XS</Option>
                    <Option value="S">S</Option>
                    <Option value="M">M</Option>
                    <Option value="L">L</Option>
                    <Option value="XL">XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={e => setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort}/>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList