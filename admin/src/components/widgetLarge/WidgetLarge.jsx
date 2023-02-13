import React, { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethods'
import "./widgetLarge.css"
import moment from "moment"

const WidgetLarge = () => {
  const Button = ({type}) => {
    return(
      <button className={'widgetLargeButton ' + type.toLowerCase()}>{type}</button>
    )
  }

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders")
        setOrders(res.data)
      } catch (err) {
        
      }
    }
    getOrders()
  })

  return (
    <div className='widgetLarge'>
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className='widgetLargeTable'>
        <tbody>
          <tr className='widgetLargeTr'>
            <th className='widgetLargeTh'>Customer</th>
            <th className='widgetLargeTh'>Date</th>
            <th className='widgetLargeTh'>Amount</th>
            <th className='widgetLargeTh'>Status</th>
          </tr>
          {orders.map(order => {
            return(
              <tr className="widgetLargeTr" key={order._id}>
                <td className="widgetLargeUser">
                  {/* <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLargeImage" /> */}
                  <span className="widgetLargeName">{order.userId}</span>
                </td>
                <td className="widgetLargeDate">{moment(order.createdAt).fromNow()}</td>
                <td className="widgetLargeAmount">€{order.amount}</td>
                <td className="widgetLargeStatus"><Button type={order.status}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLarge