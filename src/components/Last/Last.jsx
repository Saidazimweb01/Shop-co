import React from 'react'
import "./Last.css"
import logo from "../../assets/logo.svg"
import x from "../../assets/x.svg"
import face from "../../assets/facebook.svg"
import insta from "../../assets/insta.svg"
import hub from "../../assets/hub.svg"
import visa from "../../assets/visa.svg"
import master from "../../assets/master.svg"
import pay from "../../assets/pay.svg"
import apple from "../../assets/apple.svg"
import google from "../../assets/google.svg"
import { Link } from 'react-router-dom'


function Last() {
    return (
        <footer className='last'>

          <section className="contact">
            <div className="container">
                <div className="contact__out">
                    <div className="contact__box">

                        <h2 className='contact__title'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>


                        <form className='contact__form' action="#">
                            <input type="email" placeholder='Enter your email address' />
                            <button type='submit' className="contact__submit">Subscribe to Newsletter</button>
                        </form>

                    </div>
                </div>
            </div>
        </section>
            <div className="container">
                <div className="last__top">
                    <div className="last__inner">
                        <div className="last__contact">
                            <Link to={"#"}>
                                <img src={logo} alt="" />
                            </Link>

                            <p className='last__info'>
                                We have clothes that suits your style and which you’re proud to wear. From women to men.
                            </p>

                            <div className="last__social__box">
                                <Link to={"#"}>
                                    <img src={x} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={face} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={insta} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={hub} alt="" />
                                </Link>
                            </div>
                        </div>

                        <div className="last__company company">
                            <h3 className='last-company__title'>Company</h3>
                            <ul className="last-company__list">
                                <li className="last-company__item">
                                    <Link className="last-link" to={"#"}>About</Link>
                                </li>
                                <li className="last-company__item">
                                    <Link className="last-link" to={"#"}>Features</Link>
                                </li>
                                <li className="last-company__item">
                                    <Link className="last-link" to={"#"}>Works</Link>
                                </li>
                                <li className="last-company__item">
                                    <Link className="last-link" to={"#"}>Career</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="last__help help">
                            <h3 className='last-help__title'>
                                Help
                            </h3>
                            <ul className="last-help__list">
                                <li className="last-help__item">
                                    <Link className="last-link" to={"#"}>Customer Support</Link>
                                </li>
                                <li className="last-help__item">
                                    <Link className="last-link" to={"#"}>Delivery Details</Link>
                                </li>
                                <li className="last-help__item">
                                    <Link className="last-link" to={"#"}>Terms & Conditions</Link>
                                </li>
                                <li className="last-help__item">
                                    <Link className="last-link" to={"#"}>Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="last__faq faq">
                            <h3 className="last-faq__title">
                                FAQ
                            </h3>

                            <ul className="last-faq__list">
                                <li className="last-faq__item">
                                    <Link className="last-link" to={"#"}>Account</Link>
                                </li>
                                <li className="last-faq__item">
                                    <Link className="last-link" to={"#"}>Manage Deliveries</Link>
                                </li>
                                <li className="last-faq__item">
                                    <Link className="last-link" to={"#"}>Orders</Link>
                                </li>
                                <li className="last-faq__item">
                                    <Link className="last-link" to={"#"}>Payments</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="last__searches searches">
                            <h3 className="last-searches__title">Resources</h3>

                            <ul className="last-searches__list">
                                <li className="last-searches__item">
                                    <Link className="last-link" to={"#"}>
                                        Free eBooks
                                    </Link>
                                </li>
                                <li className="last-searches__item">
                                    <Link className="last-link" to={"#"}>
                                        Development Tutorial
                                    </Link>
                                </li>
                                <li className="last-searches__item">
                                    <Link className="last-link" to={"#"}>
                                        How to - Blog
                                    </Link>
                                </li>
                                <li className="last-searches__item">
                                    <Link className="last-link" to={"#"}>
                                        Youtube Playlist
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <div className="last__manage">
                        <div className="last__pay__box pay">
                            <p className='last-pay__text'>Shop.co © 2000-2026, All Rights Reserved</p>

                            <div className="last-pay__box">
                                <Link to={"#"}>
                                    <img src={visa} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={master} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={pay} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={apple} alt="" />
                                </Link>
                                <Link to={"#"}>
                                    <img src={google} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Last