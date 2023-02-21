import React, { useState } from 'react'
import "./user.css"
import { PermIdentity, EventAvailable, MailOutline, Badge, Publish, Fingerprint } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"
import { Tooltip } from '@mui/material'
import { updateUser } from '../../redux/apiCalls'

const User = () => {
    const location = useLocation()
    const userId = location.pathname.split("/")[2]
    const dispatch = useDispatch()
    const user = useSelector(state => state.appUser.appUsers.find(user => user._id === userId))
    const [inputs, setInputs] = useState({firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, isAdmin: user.isAdmin})
    const initialInputs = {firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, isAdmin: user.isAdmin}
    const {isFetching, error} = useSelector(state => state.appUser)
    const [isClicked, setIsClicked] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevState => {
            return(
                {
                    ...prevState,
                    [name]: value
                }
            )
        })
    }

    const handleUpdateClick = (e) => {
        e.preventDefault()
        setIsClicked(true)
        const updatedUser = {...inputs}
        if (!Object.values(updatedUser).every(val => typeof val === 'string' && val !== '')) {
            // At least one value in inputs is an empty string
            // Set it back to the default value
            for (const [key, value] of Object.entries(updatedUser)) {
                if (typeof value === 'string' && value === '') {
                    updatedUser[key] = initialInputs[key];
                }
            }
        }
        updateUser(userId, updatedUser, dispatch)
    }
  
    return (
    <>
        <Sidebar active="users" />
        <div className='user'>
        <div className="userTitleContainer">
            <h1 className='userTitle'>Edit User</h1>
            <Link to="/newUser">
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={user.img ? user.img : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className='userShowImg' />
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{user.username}</span>
                        <Tooltip title="Role">
                            <span className="userShowUserTitle">{user.isAdmin ? "ADMIN" : "USER"}</span>
                        </Tooltip>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <Tooltip title="Id Number">
                            <Fingerprint className='userShowIcon'/>
                        </Tooltip>
                        <span className="userShowInfoTitle">{user._id}</span>
                    </div>
                    <div className="userShowInfo">
                        <Tooltip title="Username">
                            <PermIdentity className='userShowIcon'/>
                        </Tooltip>
                        <span className="userShowInfoTitle">{user.username}</span>
                    </div>
                    <div className="userShowInfo">
                        <Tooltip title="Last Name + First Name">
                            <Badge className='userShowIcon'/>
                        </Tooltip>
                        <span className="userShowInfoTitle">{user.lastName} {user.firstName}</span>
                    </div>
                    <div className="userShowInfo">
                        <Tooltip title="User creation date">
                            <EventAvailable className='userShowIcon' />
                        </Tooltip>
                        <span className="userShowInfoTitle">{moment(user.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                    {/* <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">10.12.1999</span>
                    </div> */}
                    <span className="userShowTitle">Contact Details</span>
                    {/* <div className="userShowInfo">
                        <PhoneAndroid className='userShowIcon'/>
                        <span className="userShowInfoTitle">+1 123 456 67</span>
                    </div> */}
                    <div className="userShowInfo">
                        <Tooltip title="User Email" >
                            <MailOutline className='userShowIcon'/>
                        </Tooltip>
                        <span className="userShowInfoTitle">{user.email}</span>
                    </div>
                    {/* <div className="userShowInfo">
                        <LocationSearching className='userShowIcon'/>
                        <span className="userShowInfoTitle">New York | USA</span>
                    </div> */}
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                name="username"
                                onChange={handleChange}
                                type="text" 
                                placeholder={user.username} 
                                className='userUpdateInput'
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>First Name</label>
                            <input 
                                name="firstName"
                                onChange={handleChange}
                                type="text" 
                                placeholder={user.firstName} 
                                className='userUpdateInput'
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Last Name</label>
                            <input 
                                name="lastName"
                                onChange={handleChange}
                                type="text" 
                                placeholder={user.lastName} 
                                className='userUpdateInput'
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input 
                                name="email"
                                onChange={handleChange}
                                type="text" 
                                placeholder={user.email} 
                                className='userUpdateInput'
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Admin</label>
                            <select onChange={handleChange} defaultValue="Is this user an Admin?" name="isAdmin" id="isAdmin">
                                <option disabled>Is this user an Admin?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        {/* <div className="userUpdateItem">
                            <label>Phone</label>
                            <input 
                                type="text" 
                                placeholder='+1 123 456 67' 
                                className='userUpdateInput'
                            />
                        </div> */}
                        {/* <div className="userUpdateItem">
                            <label>Address</label>
                            <input 
                                type="text" 
                                placeholder='New York | USA' 
                                className='userUpdateInput'
                            />
                        </div> */}
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" className='userUpdateImg'/>
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                            <input type="file" id='file' style={{display: "none"}}/>
                        </div>
                        <button disabled={isFetching} className="userUpdateButton" onClick={handleUpdateClick}>Update</button>
                        {isClicked && <span className={error ? "errorMessage" : "successMessage"}>{error ? "oops, something went wrong" : "User has successfully been updated"}</span>}
                    </div>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default User
