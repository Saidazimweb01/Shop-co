import React from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom'
import heroImg from "../../assets/hero-img.jpg"
import { useTranslation } from 'react-i18next'


function Hero({ isPublic }) {

    const { t, i18n } = useTranslation()

    console.log("Mavjud tillar:", i18n.reportNamespaces.resStore);
    return (
        <>
            <section className={isPublic ? "hero" : "hero__not"}>
                <div className="hero__out">
                    <div className="container">
                        <div className="hero__box">
                            <div className="hero__main">
                                <h2 className='hero__title'>{t("public.title")}</h2>
                                <p className="hero__info">{t("public.text")}</p>
                                {
                                    isPublic && <Link to={"/register"}>{t("public.shop")}</Link>
                                }

                                <ul className="hero__list">
                                    <li className="hero__item">
                                        <h3 className="hero__count">200+</h3>
                                        <p className="hero__text">{t("public.brand1")}</p>
                                    </li>
                                    <li className="hero__item">
                                        <h3 className="hero__count">2,000+</h3>
                                        <p className="hero__text">{t("public.brand2")}</p>
                                    </li>
                                    <li className="hero__item">
                                        <h3 className="hero__count">30,000+</h3>
                                        <p className="hero__text">{t("public.brand3")}</p>
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