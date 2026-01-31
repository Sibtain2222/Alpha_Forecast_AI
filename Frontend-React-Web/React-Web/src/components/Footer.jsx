import React from 'react'
import '../assets/css/style.css'

const Footer = () => {
  return (
    <>
     {/* <footer className='text-light footer py-5 my-5 mt-auto bg-dark text-light text-center py-4 '> */}
      <hr className="border-light mx-5"/>
      <footer className="af-footer  py-5 my-5 mt-auto   py-4">
  <p className="af-footer-text">
    © 2026 <span className="highlight">Alpha Forecast</span> |
    Crafted by <span className="highlight">Sibtain</span>
  </p>
</footer>
     
  {/* </footer> */}
     

    </>
  )
}

export default Footer