import React, { useEffect, useMemo, useState } from 'react'
import "./product.css"
import { Link, useLocation } from "react-router-dom"
import Chart from "../../components/charts/Chart"
// import { productData } from '../../dummyData'
import { Publish } from "@mui/icons-material"
import Sidebar from '../../components/sidebar/Sidebar'
import { useSelector } from "react-redux"
import { userRequest } from '../../requestMethods'

const Product = () => {
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  // console.log(location.pathname + "    " + productId)
  const [productStats, setProductStats] = useState([])
  const [totalProductSales, setTotalProductSales] = useState(null)

  const product = useSelector(state => state.product.products.find(product => product._id === productId))

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ], [])

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(`orders/sales/${productId}`)
        res.data.map(item => 
          setProductStats(prevState => [
            ...prevState,
            {name: MONTHS[item._id - 1], Sales: item.totalSales }
          ])
        )
      } catch (err) {
        
      }
    }
    getProductStats()
  }, [productId, MONTHS])

  useEffect(() => {
    const getTotalProductSales = async () => {
      try {
        const res = await userRequest.get(`orders/products/${productId}/total-sales`)
        setTotalProductSales(res.data)
      } catch (err) {
        
      }
    }
    getTotalProductSales()
  }, [productId])

  return (
    <>
      <Sidebar active="products" />
      <div className='product'>
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product.img} alt="" className="productInfoImg" />
              <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">Id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Sales:</span>
                <span className="productInfoValue">{totalProductSales?.totalSales}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Number Sold:</span>
                <span className="productInfoValue">{totalProductSales?.count}</span>
              </div>
              {/* <div className="productInfoItem">
                <span className="productInfoKey">Active:</span>
                <span className="productInfoValue">Yes</span>
              </div> */}
              <div className="productInfoItem">
                <span className="productInfoKey">In Stock:</span>
                <span className="productInfoValue">{product.inStock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input type="text" placeholder={product.title}/>
              <label>Product Description</label>
              <input type="text" placeholder={product.desc}/>
              <label>Product Price</label>
              <input type="text" placeholder={product.price}/>
              <label>In Stock</label>
              <select name="inStock" id="inStock">
                <option value="true">Yes</option>  
                <option value="false">No</option>  
              </select>
              {/* <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>  
                <option value="no">No</option>  
              </select> */}
            </div>  
            <div className="productFormRight">
              <div className="productUpload">
                <img src={product.img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish style={{cursor: "pointer"}}/>  
                </label>
                <input type="file" id='file' style={{display: "none"}} />
              </div>
              <button className='productButton'>Update</button>
            </div>  
          </form>
        </div>
      </div>
    </>
  )
}
export default Product