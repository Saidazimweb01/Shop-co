import React from 'react'
import "./Categories.css"
import casual from "../../assets/casual.png"
import formal from "../../assets/formal.png"
import party from "../../assets/party.png"
import gym from "../../assets/gym.png"

function Categories({ isPublic }) {
    return (
        <>
            <section className='categories'>
                <div className="container">
                    <div className="categories__out">
                        <h2 className='categories__title'>BROWSE BY dress STYLE</h2>
                        <div className='categories__box'>
                            <div className="categories__card">
                                <h3 className='categories__name'>Casual</h3>
                                <img src={casual} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>Formal</h3>
                                <img src={formal} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>Party</h3>
                                <img src={party} alt="Casual" />
                            </div>
                            <div className="categories__card">
                                <h3 className='categories__name'>Gym</h3>
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