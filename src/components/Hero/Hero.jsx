import React from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom'
import heroImg from "../../assets/hero-img.jpg"


function Hero({ isPublic }) {
    return (
        <>
            <section className={isPublic ? "hero" : "hero__not"}>
                <div className="hero__out">
                    <div className="container">
                        <div className="hero__box">
                            <div className="hero__main">
                                <h2 className='hero__title'>FIND CLOTHES THAT MATCHES YOUR STYLE</h2>
                                <p className="hero__info">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                                {
                                    isPublic && <Link to={"/register"}>Shop Now</Link>
                                }

                                <ul className="hero__list">
                                    <li className="hero__item">
                                        <h3 className="hero__count">200+</h3>
                                        <p className="hero__text">International Brands</p>
                                    </li>
                                    <li className="hero__item">
                                        <h3 className="hero__count">2,000+</h3>
                                        <p className="hero__text">High-Quality Products</p>
                                    </li>
                                    <li className="hero__item">
                                        <h3 className="hero__count">30,000+</h3>
                                        <p className="hero__text">Happy Customers</p>
                                    </li>
                                </ul>

                            </div>
                            <img className='hero__img' src={heroImg} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero