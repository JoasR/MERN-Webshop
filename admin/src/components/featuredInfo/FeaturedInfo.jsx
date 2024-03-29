import React, { useEffect, useState } from 'react'
import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { userRequest } from "../../requestMethods"

const FeaturedInfo = () => {

    const [income, setIncome] = useState([])
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        const getIncome = async() => {
            try {
                const res = await userRequest.get("orders/income") //returns last month and this month
                setIncome(res.data)
                setPercentage(100 * (res.data[1].total - res.data[0].total) / res.data[0].total ) //calculates the change in percentage
            } catch (err) {
                
            }
        }
        getIncome()
    }, [])

    // console.log(income)
    // console.log(percentage)

  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">€{income[1]?.total}</span>
                <div className="featuredMoneyRate">
                    {Math.floor(percentage)}% 
                    {
                        percentage < 0 ? 
                        <ArrowDownward className='featuredIcon negative'/> : 
                        <ArrowUpward className='featuredIcon positive'/>
                    }
                </div>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">€4,415</span>
                <div className="featuredMoneyRate">
                    -1.4 <ArrowDownward className='featuredIcon negative'/>
                </div>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">€2,225</span>
                <div className="featuredMoneyRate">
                    +2.4 <ArrowUpward className='featuredIcon positive'/>
                </div>
            </div>
            <span className="featuredSub">Compare to last month</span>
        </div>
    </div>
  )
}

export default FeaturedInfo