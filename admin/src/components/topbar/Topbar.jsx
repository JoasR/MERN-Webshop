import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Settings } from "@mui/icons-material"
import topAvatar from "../../assests/frisk_logo.png"
import { Link } from "react-router-dom"

const Topbar = () => {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">FriskAdmin</span>
                </Link>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src={topAvatar} alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar