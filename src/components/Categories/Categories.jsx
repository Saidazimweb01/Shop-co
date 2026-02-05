import React from 'react'
import "./Categories.css"
import casual from "../../assets/casual.png"
import formal from "../../assets/formal.png"
import party from "../../assets/party.png"
import gym from "../../assets/gym.png"
import { useTranslation } from 'react-i18next'

function Categories({ isPublic }) {
    const { t, i18n } = useTranslation()

    return (
        <>
            <section className='categories'>
                <div className="container">
                    <div className="categories__out">
                        <h2 className='categories__title'>{t("categories.title")}</h2>
                        <div className='categories__box'>
                            <div className="categories__card">
                                <h3 className='categories__name'>{t("categories.casual")}</h3>
                                <img src={casual} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>{t("categories.formal")}</h3>
                                <img src={formal} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>{t("categories.party")}</h3>
                                <img src={party} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>{t("categories.gym")}</h3>
                                <img src={gym} alt="Casual" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories