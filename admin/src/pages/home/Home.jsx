import React, { useEffect, useMemo, useState } from 'react'
import "./home.css"
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/charts/Chart'
// import { userData } from "../../dummyData"
import WidgetSmall from '../../components/widgetSmall/WidgetSmall'
import WidgetLarge from '../../components/widgetLarge/WidgetLarge'
import Sidebar from '../../components/sidebar/Sidebar'
import { userRequest } from '../../requestMethods'

const Home = () => {
  const [userStats, setUserStats] = useState([])

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
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats")
        res.data.map(item => 
          setUserStats(prevState => {
            return [
              ...prevState,
              {name: MONTHS[item._id - 1], "Active Users": item.total} //Made like this in the api, whens ending user stats. Id is the month so id: 0 is jan, id 1 is feb... and now name prop is set to corresponding month from MONTHS
            ]
          })
        )
      } catch (err) {
        
      }
    }
    getStats()
  }, [MONTHS])

  // console.log(userStats)
  
  return (
    <>    
      <Sidebar active="home" />
      <div className='home'>
        <FeaturedInfo />
        <Chart data={userStats} title="User Analytics" grid dataKey="Active Users"/>
        <div className="homeWidgets">
          <WidgetSmall />
          <WidgetLarge />
        </div>
      </div>
    </>
  )
}

export default Home