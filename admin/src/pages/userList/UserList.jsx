import "./userList.css"
import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
// import { useState } from "react"
import { DeleteOutline } from "@mui/icons-material"
// import { userRows } from "../../dummyData"
import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { deleteUser, getAppUsers } from "../../redux/apiCalls"
import moment from "moment"

const UserList = () => {
  // const [data, setData] = useState(userRows)
  const dispatch = useDispatch()

  const deleteMessage = useSelector(state => state.appUser.message)
  const appUsers = useSelector(state => state.appUser.appUsers)

  useEffect(() => {
    getAppUsers(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    // setData(data.filter(item => {
    //   return item.id !== id
    // }))
    deleteUser(id, dispatch)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "username", headerName: "UserName", width: 200, renderCell: (params) => {
      return(
        <div className='userListUser'>
          <img src={params.row.img ? params.rows.img : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className='userListImage'/>
          {params.row.username}
        </div>
      )
    } },
    { field:"email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "isAdmin", headerName: "Admin", width: 65 },
    { field: "createdAt", headerName: "Created", width: 105, valueFormatter: params => moment(params?.value).format("DD/MM/YYYY") },
    // { field: "status", headerName: "Status", width: 120 },
    // { field: "transaction", headerName: "Transaction Volume", sortable: false, width: 160 },
    { field: "action", headerName: "Action", width: 150, renderCell: (params) => {
      return(
        <>
          <Link to={`/user/${params.row._id}`}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)}/>
        </>
      )
    }}
  ]

  return (
    <>
      <Sidebar active="users"/>
      <div className='userList'>
        <DataGrid
          rows={appUsers}
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

export default UserList
