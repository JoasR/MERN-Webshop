import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
// import { popularProducts } from '../data'
import Product from './Product'
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( 
          cat
            ? `http://localhost:5000/api/products?category=${cat}` 
            : "http://localhost:5000/api/products"
          )
        setProducts(res.data)
      } catch (err) {
        //TODO: ADD ERR HANDLER
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
    //Check if any of the products contain the filters
    //So Key is size, color and value is e.g. medium and red
    //If the keys contains the values then we want to display that product

    //DONE: make it so all-colors and all-sizes filters work 
    cat && 
      setFilteredProducts(
        products.filter(item => 
          Object.entries(filters).every(([key, value]) => {
            if(filters.color === "all-colors" && filters.size === "all-sizes"){
              return item
            }
            if(filters.color === "all-colors"){
              console.log("i still get here")
              console.log(item.size)
              if(item.size[0] && filters.size && item.size[0].toLowerCase() === filters.size.toLowerCase()){
                console.log("i got it", item)
                return item
              }
            }
            if(filters.size === "all-sizes"){
              if(item.color[0] && filters.color && item.color[0].toLowerCase() === filters.color.toLowerCase()){
                return item
              }
            }
            return item[key].includes(value || value.toLowerCase())
          })
        )
      )
  }, [products, cat, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      )
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      )
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <Container>
      { cat
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products
            .slice(0, 8)
            .map((item) => <Product key={item._id} item={item} />)
      }
    </Container>
  )
}

export default Products