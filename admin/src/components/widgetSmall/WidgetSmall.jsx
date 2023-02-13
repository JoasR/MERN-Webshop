import React, { useEffect, useState } from 'react'
import "./widgetSmall.css"
import { Visibility } from "@mui/icons-material"
import { userRequest } from "../../requestMethods"

const WidgetSmall = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async() => {
            try {
                const res = await userRequest.get("users/?new=true")
                setUsers(res.data)   
            } catch (err) {

            }
        }
        getUsers()
    })
  return (
    <div className='widgetSmall'>
        <h3 className="widgetSmallTitle">New Members</h3>
        <ul className="widgetSmallList">
            {users.map(user => {
                return (
                    <li className="widgetSmallListItem" key={user._id}>
                        <img src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="widgetSmallImage" />
                        <div className="widgetSmallUser">
                            <span className="widgetSmallUsername">{user.username}</span>
                            {/* <span className='widgetSmallUserTitle'>user title</span> */}
                        </div>
                        <button className="widgetSmallButton">
                            <Visibility className="widgetSmallIcon"/>
                            Display
                        </button>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default WidgetSmall