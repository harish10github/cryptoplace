import React from 'react'
import NavBar from './components/Navbar/NavBar'
import { HashRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import CoinContextProvider from './context/CoinContext.jsx'
import Footer from './components/footer/Footer.jsx'
const App = () => {
  return (
    <HashRouter>
    <CoinContextProvider>
      <div className='app'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/coin/:coinid' element={<Coin/>}></Route>
        </Routes>
          <Footer />
      </div>
      </CoinContextProvider> 
    </HashRouter>
    
  )
}

export default App