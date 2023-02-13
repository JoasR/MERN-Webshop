import React, { useEffect } from 'react'
// import { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
// import { productRows } from "../../dummyData"
import { Link } from "react-router-dom"
import "./productList.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../redux/apiCalls'

const ProductList = () => {
    // const [data, setData] = useState(productRows)
    const dispatch = useDispatch()
    
    const products = useSelector(state => state.product.products)
    const deleteMessage = useSelector(state => state.product.message)

    useEffect(() => {
      getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        // setData(data.filter((item) => item.id !== id))
        deleteProduct(id, dispatch)
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        { field: "product", headerName: "Product", width: 200, renderCell: (params) => {
          return(
            <div className='productListItem'>
              <img src={params.row.img} alt="" className='productListImage'/>
              {params.row.title}
            </div>
          )
        } },
        { field:"inStock", headerName: "Stock", width: 200 },
        // { field: "status", headerName: "Status", width: 120 },
        { field: "price", headerName: "Price", sortable: false, width: 160 },
        { field: "action", headerName: "Action", width: 150, renderCell: (params) => {
          return(
            <>
              <Link to={`/product/${params.row._id}`}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)}/>
            </>
          )
        }}
      ]

  return (
    <>
      <Sidebar active="products"/>
      <div className='productList'>
        <DataGrid className='grid'
          rows={products}
          columns={columns}
          getRowId={row => row._id}
          disableSelectionOnClick
          autoHeight={true}
          pageSize={10}
          checkboxSelection
        />
        { 
          deleteMessage 
          && 
          <span className="message">
            {deleteMessage}
          </span>
        }
      </div>
    </>
  )
}

export default ProductList
