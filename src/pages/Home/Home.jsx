import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {currency,allcoin} = useContext(CoinContext)
  const [displaycoin,setcoin] = useState([])
  const [input,setinput] = useState('')
  
  const inputHandler = (event)=>{
    setinput(event.target.value)
    if (event.target.value == ''){
      setcoin(allcoin)
    }
  }
  const searchHandler = async (event)=>{
    event.preventDefault()
    const coins = await allcoin.filter((element)=>{
      return element.name.toLowerCase().includes(input.toLowerCase())
    })
    setcoin(coins)
  }

  useEffect(()=>{
    setcoin(allcoin)
  },[allcoin])
  return (
    <div>
        <div className="hero">
            <h1>Largest <br /> Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Signup to explore more about cryptos.</p>
            <form onSubmit={searchHandler} action="">
                <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto...' />
                <datalist id='coinlist'>
                  {allcoin.map((Item,index)=> <option key={index} value={Item.name} />)}
                </datalist>

                <button type='submit'>Search</button>
            </form>
        </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H change</p>
          <p className='market-cap' style={{ textAlign: 'right ' }}>Market cap</p>

        </div>
        {
          displaycoin.slice(0,10).map((element,index)=>{
            return(<Link to={`/coin/${element.id}`} className="table-layout">
              <p>{element.market_cap_rank }</p>
              <div>
                <img src={element.image} alt="" />
                <p>{element.name + '-' + element.symbol}</p>
              </div>
              <p>{currency.symbol} {element.current_price}</p>
              <p className={element.price_change_percentage_24h>0? 'green':'red'} style={{textAlign:'center'} }>{Math.floor(element.price_change_percentage_24h*100)/100}</p>
              <p style={{ textAlign: 'right ' }}>{currency.symbol}{element.market_cap}</p>
            </Link>)
          })
        }
      </div>
      
    </div>
  )
}

export default Home