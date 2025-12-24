import React from 'react'
import "./Footer.css"
import zara from "../../assets/zara.png"
import gucci from "../../assets/mejik.png"
import prada from "../../assets/prada.png"
import calvin from "../../assets/calvin.png"
import versace from "../../assets/versace.png"

function Footer() {
    return (
        <>
            <footer className='foot'>
                <div className="container">
                    <div className="foot__box">
                        <img src={versace} alt="Versace brand" width={166} height={33} />
                        <img src={zara} alt="Zara brand" />
                        <img src={gucci} alt="Gucci brand" />
                        <img src={prada} alt="Zara brand" />
                        <img src={calvin} alt="Versace brand" />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer