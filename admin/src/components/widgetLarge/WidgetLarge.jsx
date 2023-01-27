import React from 'react'
import "./widgetLarge.css"

const WidgetLarge = () => {
  const Button = ({type}) => {
    return(
      <button className={'widgetLargeButton ' + type}>{type}</button>
    )
  }

  return (
    <div className='widgetLarge'>
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className='widgetLargeTable'>
        <tr className='widgetLargeTr'>
          <th className='widgetLargeTh'>Customer</th>
          <th className='widgetLargeTh'>Date</th>
          <th className='widgetLargeTh'>Amount</th>
          <th className='widgetLargeTh'>Status</th>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLargeImage" />
            <span className="widgetLargeName">Susan Carol</span>
          </td>
          <td className="widgetLargeDate">2 Jun 2021</td>
          <td className="widgetLargeAmount">€122.00</td>
          <td className="widgetLargeStatus"><Button type="Approved"/></td>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLargeImage" />
            <span className="widgetLargeName">Susan Carol</span>
          </td>
          <td className="widgetLargeDate">2 Jun 2021</td>
          <td className="widgetLargeAmount">€122.00</td>
          <td className="widgetLargeStatus"><Button type="Declined"/></td>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLargeImage" />
            <span className="widgetLargeName">Susan Carol</span>
          </td>
          <td className="widgetLargeDate">2 Jun 2021</td>
          <td className="widgetLargeAmount">€122.00</td>
          <td className="widgetLargeStatus"><Button type="Pending"/></td>
        </tr>
        <tr className="widgetLargeTr">
          <td className="widgetLargeUser">
            <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLargeImage" />
            <span className="widgetLargeName">Susan Carol</span>
          </td>
          <td className="widgetLargeDate">2 Jun 2021</td>
          <td className="widgetLargeAmount">€122.00</td>
          <td className="widgetLargeStatus"><Button type="Approved"/></td>
        </tr>
      </table>
    </div>
  )
}

export default WidgetLarge