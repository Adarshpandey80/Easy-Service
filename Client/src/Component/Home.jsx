import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import '../Style/Home.css'
import Services from './Services.jsx'



const Home = () => {

 const [data, setData] = useState([])


  React.useEffect(() => {
    axios.get('/api')
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err , "error while fetching data");
      })
  
  
  }, [])
  return (
    <>

      <div className='images'>
        <img src="/Images/AC.webp" alt="AC Photo" />
        <img src="/Images/cooler.jpg" alt="" />
        <img src="/Images/friz.png" alt="" />
        <img src="/Images/Induction.webp" alt="" />
        <img src="/Images/Inverter.jpg" alt="" />
        <img src="/Images/microwave.jpg" alt="" />
        <img src="/Images/mixer.jpg" alt="" />
        <img src="/Images/TV.jpg" alt="" />
        <img src="/Images/washingmachine.avif" alt="" />
        <img src="/Images/waterHeater.jpg" alt="" />
        <img src="/Images/waterPurifier.webp" alt="" />
      </div>

      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Fast & Reliable Electrician & Home Appliance Repair</h1>
            <p>
              Fridge, Cooler, Washing Machine, AC & more – Expert Service at Your
              Doorstep
            </p>
            <button onClick={() => setShowModal(true)}>Login</button>
          </div>
        </div>
       </section>
    
     <Services/>

    </>
  )
}

export default Home
