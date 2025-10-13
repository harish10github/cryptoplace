import React, { useContext } from 'react'
import '../Navbar/NavBar.css'
import logo from '../../assets/logo.png'
import signup from '../../assets/arrow_icon.png'
import {CoinContext} from '../../context/CoinContext.jsx'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const {setCurrency} = useContext(CoinContext)
  const handleCurrency=(event)=>{
    switch(event.target.value)  {
      case 'usd':
        setCurrency({name:'usd',symbol:'$'})
        break
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' })
        break
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' })
        break
      default:
        setCurrency({ name: 'usd', symbol: '$' })  
        break    
    }  
  }
  return (
    <nav className='navbar'>
      <Link to={'/'}><img className='logo' src={logo} alt="logo" /></Link> 
        <ul>
        <Link to={'/'}><li>Home</li></Link> 
            <li>Feature</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select onChange={handleCurrency}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
            <button>Sign up <img src={signup} alt="" /></button>
        </div>
        
    </nav>
  )
}

export default NavBar