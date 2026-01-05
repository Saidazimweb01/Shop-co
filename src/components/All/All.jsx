import React from 'react'
import "./All.css"
import { Link } from 'react-router-dom'
import filterr from "../../assets/filter2.svg"
import next from "../../assets/next.svg"
import isopen from "../../assets/isopen.svg"

function All() {
    return (
        <>
            <section className='all'>
                <div className="container">
                    <div className="all__top-box">
                        <Link to={"/user"}>Home &gt;</Link>
                        <Link to={"/products"}>Casual</Link>
                    </div>

                    <div className="all__main">
                        <div className="all__left">
                            <div className="all-left__title-box">
                                <h2 className='all-left__title'>Filters</h2>
                                <button className='all-left__filter-btn'><img src={filterr} alt="" /></button>
                            </div>

                            <div className="all-left__type-box">
                                <div className="all-left-type__inner">
                                    <button className='all-left-type-btn'>T-shirts <img src={next} alt="" /></button>
                                </div>
                                <div className="all-left-type__inner">
                                    <button className='all-left-type-btn'>Shorts <img src={next} alt="" /></button>
                                </div>
                                <div className="all-left-type__inner">
                                    <button className='all-left-type-btn'>Shirts <img src={next} alt="" /></button>
                                </div>
                                <div className="all-left-type__inner">
                                    <button className='all-left-type-btn'>Hoodie <img src={next} alt="" /></button>
                                </div>
                                <div className="all-left-type__inner">
                                    <button className='all-left-type-btn'>Jeans <img src={next} alt="" /></button>
                                </div>
                            </div>

                            <div className="all-left__price-box">
                                <div className="all-left__price-inner">
                                    <h2 className='all-left-price__title'>Price</h2>
                                    <button className='all-left__open-btn'><img src={isopen} alt="" /></button>
                                </div>

                                <form action="#">
                                    <input type="range" className='all-left__price-inp' />
                                </form>
                            </div>


                            <div className="all-left__colors-box">
                                <div className="all-left__colors-inner">
                                    <h2 className='all-left__colors-title'>Colors</h2>
                                    <button className='all-left__open-btn'><img src={isopen} alt="" /></button>
                                </div>
                                <form action="#">
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                    <input type="radio" />
                                </form>
                            </div>

                            <div className="all-left__size-box">
                                <div className="all-left__size__inner">
                                    <h2 className='all-left__size-title'>Size</h2>
                                    <button className='all-left__open-btn'><img src={isopen} alt="" /></button>
                                </div>
                                <div className="all-left__size-btn">
                                    <button className='all-left__sizes'>
                                        Small
                                    </button>
                                    <button className='all-left__sizes'>
                                        Medium
                                    </button>
                                    <button className='all-left__sizes'>
                                        Large
                                    </button>
                                    <button className='all-left__sizes'>
                                        X-Large
                                    </button>
                                </div>
                            </div>

                            <div className="all-left__category-box">
                                <div className="all-left__category-inner">
                                    <h2 className='all-left__category-title'>
                                        Dress Style
                                    </h2>
                                    <button className="all-left__open-btn"><img src={isopen} alt="" /></button>

                                </div>
                                <div className="all-left__categories">
                                    <button className="all-left__category">Casual <img src={next} alt="" /></button>
                                    <button className="all-left__category">Formal <img src={next} alt="" /></button>
                                    <button className="all-left__category">Party <img src={next} alt="" /></button>
                                    <button className="all-left__category">Gym <img src={next} alt="" /></button>
                                </div>


                            </div>

                            <div className="all-left__submit-box">
                                <button className='all-left__btn'>Apply Filter</button>
                            </div>
                        </div>
                        <div className="all__right">

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default All