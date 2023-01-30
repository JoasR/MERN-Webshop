import React from 'react'
import "./home.css"
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/charts/Chart'
import { userData } from "../../dummyData"
import WidgetSmall from '../../components/widgetSmall/WidgetSmall'
import WidgetLarge from '../../components/widgetLarge/WidgetLarge'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
  return (
    <>    
      <Sidebar active="home" />
      <div className='home'>
        <FeaturedInfo />
        <Chart data={userData} title="User Analytics" grid dataKey="Active Users"/>
        <div className="homeWidgets">
          <WidgetSmall />
          <WidgetLarge />
        </div>
      </div>
    </>
  )
}

export default Home