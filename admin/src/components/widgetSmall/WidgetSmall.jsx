import React from 'react'
import "./widgetSmall.css"
import { Visibility } from "@mui/icons-material"

const WidgetSmall = () => {
  return (
    <div className='widgetSmall'>
        <h3 className="widgetSmallTitle">New Members</h3>
        <ul className="widgetSmallList">
            <li className="widgetSmallListItem">
                <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="widgetSmallImage" />
                <div className="widgetSmallUser">
                    <span className="widgetSmallUsername">Anna Keller</span>
                    <span className='widgetSmallUserTitle'>Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <Visibility className="widgetSmallIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmallListItem">
                <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="widgetSmallImage" />
                <div className="widgetSmallUser">
                    <span className="widgetSmallUsername">Anna Keller</span>
                    <span className='widgetSmallUserTitle'>Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <Visibility className="widgetSmallIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmallListItem">
                <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="widgetSmallImage" />
                <div className="widgetSmallUser">
                    <span className="widgetSmallUsername">Anna Keller</span>
                    <span className='widgetSmallUserTitle'>Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <Visibility className="widgetSmallIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmallListItem">
                <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="widgetSmallImage" />
                <div className="widgetSmallUser">
                    <span className="widgetSmallUsername">Anna Keller</span>
                    <span className='widgetSmallUserTitle'>Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <Visibility className="widgetSmallIcon"/>
                    Display
                </button>
            </li>
            <li className="widgetSmallListItem">
                <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="widgetSmallImage" />
                <div className="widgetSmallUser">
                    <span className="widgetSmallUsername">Anna Keller</span>
                    <span className='widgetSmallUserTitle'>Software Engineer</span>
                </div>
                <button className="widgetSmallButton">
                    <Visibility className="widgetSmallIcon"/>
                    Display
                </button>
            </li>
        </ul>
    </div>
  )
}

export default WidgetSmall