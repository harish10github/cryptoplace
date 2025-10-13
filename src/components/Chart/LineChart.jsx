import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicaldata }) => {
    const [data,setdata] = useState([['Dates','Prices']])
    useEffect(()=>{
        let datacopy = [['Dates', 'Prices']]
        if(historicaldata.prices){
            historicaldata.prices.map((element,index)=>{
                datacopy.push([`${new Date(element[0]).toLocaleDateString().slice(0,-5)}`,element[1]])
            })
            setdata(datacopy)
        }
    },[historicaldata])
  return (
    <Chart
      chartType='LineChart'
      data={data}
      height='100%'
      legendToggle
    />
  )
}

export default LineChart