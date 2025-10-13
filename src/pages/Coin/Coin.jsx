import React,{useContext, useEffect, useState} from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/Chart/LineChart.jsx'
const Coin = () => {
  const {coinid} = useParams()
  const[coindata,setcoindata] = useState()
  const [historicaldata, sethistoricaldata] = useState()
  const {currency} = useContext(CoinContext)
  const fetchcoindata = async ()=>{
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}`;
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-KXeZ5HpgDa7Z4gsvMErcricK' }, body: undefined };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setcoindata(data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchHistData = async ()=>{
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-KXeZ5HpgDa7Z4gsvMErcricK' }, body: undefined };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      sethistoricaldata(data)
    } catch (error) {
      console.error(error);
    }
  }


 useEffect(()=>{
  fetchcoindata()
  fetchHistData()
 },[currency,coinid])
  if(coindata && historicaldata){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coindata.image.large} alt="coin" />
          <p><b>{coindata.name}({coindata.symbol.toUpperCase()})</b></p>

        </div>
        <div className="coin-chart">
          <LineChart historicaldata={historicaldata}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current price</li>
            <li>{currency.symbol} {coindata.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }else{
    <div className="spinner">
      <div className="spin"></div>
    </div>
  }
  
}

export default Coin