import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const StockDetails = () => {
  const [error, setError] = useState(null)
  const { stockId } = useParams()

  const [stockDetails, setStockDetails] = useState([])
  useEffect(() => {
    console.log('抓細節資料')
    async function getDetails() {
      let response = await axios.get(
        `http://localhost:3001/api/stocks/${stockId}`
      )
      console.log(response)
      setStockDetails(response.data)
    }
    getDetails()
  }, [])

  console.log('stock-detail', stockId)

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            // backgroundColor: page === i ? '#00d1b2' : '',
            // borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            // color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
        >
          1
        </li>
      </ul>
      目前在第 1 頁
      {stockDetails.map((detail, index) => {
        {
          /* detail.date.format('YYYY-MM-DD HH:mm') */
        }

        return (
          <div
            key={detail.date}
            className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              日期：{moment(detail.date).format('YYYY-MM-DD HH:mm')}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交金額：{detail.amount}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交股數： {detail.volume}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              開盤價： {detail.open_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              收盤價： {detail.close_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              漲跌價差： {detail.delta_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最高價： {detail.high_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最低價： {detail.low_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交筆數： {detail.transactions}
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default StockDetails
