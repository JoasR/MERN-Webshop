import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
// import { popularProducts } from '../data'
import Product from './Product'
import { publicRequest } from '../requestMethods'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort, showAmount }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        const sortedProducts = [...res.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } catch (err) {
        //TODO: ADD ERR HANDLER
      }
    }
    getProducts()
  }, [cat])

  // useEffect(() => {
  //   //Check if any of the products contain the filters
  //   //So Key is size, color and value is e.g. medium and red
  //   //If the keys contains the values then we want to display that product

  //   //DONE: make it so all-colors and all-sizes filters work 
  //   cat &&
  //     setFilteredProducts(
  //       products.filter(item => 
  //         Object.entries(filters).every(([key, value]) => {
  //           if(filters.color === "all-colors" && filters.size === "all-sizes"){
  //             return item
  //           }
  //           if(filters.color === "all-colors"){
  //             if(item.size && filters.size && item.size.includes(filters.size.toLowerCase() || filters.size.toUpperCase())){
  //               return item
  //             }
  //           }
  //           if(filters.size === "all-sizes"){
  //             if(item.color[0] && filters.color && item.color[0].toLowerCase() === filters.color.toLowerCase()){
  //               return item
  //             }
  //           }
  //           return item[key].includes(value || value.toLowerCase())
  //         })
  //       )
  //     )
  // }, [products, cat, filters])

  useEffect(() => {
    let filtered = [...products];
    if (filters?.color && filters.color !== 'all-colors') {
      filtered = filtered.filter((product) =>
        product.color.map((color) => color.toLowerCase()).includes(filters.color.toLowerCase())
      );
    }
    if (filters?.size && filters.size !== 'all-sizes') {
      filtered = filtered.filter((product) =>
        product.size.map((size) => size.toLowerCase()).includes(filters.size.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [products, filters]);

  useEffect(() => {
    //console.log(sort)
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
      { cat || filters 
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products
            .slice(0, showAmount)
            .map((item) => <Product key={item._id} item={item} />)
      }
    </Container>
  )
}

Products.defaultProps = {
  showAmount: 100
}

export default Products