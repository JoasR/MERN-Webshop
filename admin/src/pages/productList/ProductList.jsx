import React, { useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { DeleteOutline } from "@mui/icons-material"
import { productRows } from "../../dummyData"
import { Link } from "react-router-dom"
import "./productList.css"
import Sidebar from '../../components/sidebar/Sidebar'

const ProductList = () => {
    const [data, setData] = useState(productRows)

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "product", headerName: "Product", width: 200, renderCell: (params) => {
          return(
            <div className='productListItem'>
              <img src={params.row.img} alt="" className='productListImage'/>
              {params.row.name}
            </div>
          )
        } },
        { field:"stock", headerName: "Stock", width: 200 },
        { field: "status", headerName: "Status", width: 120 },
        { field: "price", headerName: "Price", sortable: false, width: 160 },
        { field: "action", headerName: "Action", width: 150, renderCell: (params) => {
          return(
            <>
              <Link to={`/product/${params.row.id}`}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row.id)}/>
            </>
          )
        }}
      ]

  return (
    <>
      <Sidebar active="products"/>
      <div className='productList'>
        <DataGrid
          rows={data}
          columns={columns}
          disableSelectionOnClick
          pageSize={8}
          checkboxSelection
        />
      </div>
    </>
  )
}

export default ProductList
