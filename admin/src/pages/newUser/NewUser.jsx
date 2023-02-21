import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import { addUser } from '../../redux/apiCalls'
import "./newUser.css"

const NewUser = () => {
    const [inputs, setInputs] = useState({isAdmin: false})
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.appUser)
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

    const handleClick = (e) => {
        e.preventDefault()
        setIsClicked(true)
        const createdUser = {...inputs}
        addUser(createdUser, dispatch)
    }

  return (
    <>
        <Sidebar active="users"/>
        <div className='newUser'>
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
            <div className="newUserItem">
                <label>Username</label>
                <input name='username' type="text" placeholder='johnSmith1506' onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>First Name</label>
                <input name='firstName' type="text" placeholder='John' onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Last Name</label>
                <input name='lastName' type="text" placeholder='Smith' onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Email</label>
                <input name='email' type="text" placeholder='John.Smith@gmail.com' onChange={handleChange}/>
            </div>
            <div className="newUserItem">
                <label>Password</label>
                <input name='password' type="password" placeholder='password' onChange={handleChange}/>
            </div>
            {/* <div className="newUserItem">
                <label>Phone</label>
                <input type="text" placeholder='+1 123 456 78'/>
            </div> */}
            {/* <div className="newUserItem">
                <label>Address</label>
                <input type="text" placeholder='New York | USA'/>
            </div>
            <div className="newUserItem">
                <label>Gender</label>
                <div className="newUserGender">
                    <input type="radio" name='gender' id='male' value="male" />
                    <label for="male">Male</label>
                    <input type="radio" name='gender' id='female' value="female" />
                    <label for="female">Female</label>
                    <input type="radio" name='gender' id='other' value="other" />
                    <label for="other">Other</label>
                </div>
            </div> */}
            <div className="newUserItem">
                <label>Admin</label>
                <select className='newUserSelect' name='isAdmin' id='isAdmin' onChange={handleChange}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <button disabled={isFetching} className="newUserButton" onClick={handleClick}>Create</button>
        </form>
        {(error && isClicked) && <span className='errorMessage' style={{fontSize: "14px", color: "red"}}>{error}</span>}
        {(!error && isClicked) && <span className='successMessage' style={{fontSize: "14px", color: "green"}}>User has successfully been created</span>}
        </div>
    </>
  )
}

export default NewUser
