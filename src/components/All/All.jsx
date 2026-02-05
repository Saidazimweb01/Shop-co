import React, { useEffect, useReducer, useState } from 'react'
import "./All.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import filterr from "../../assets/filter2.svg"
import next from "../../assets/next.svg"
import tshirt from "../../assets/t-shirt.png"
import isopen from "../../assets/isopen.svg"

const initialState = {
    loading: "loader",
    products: [],
    isOpen: false,
    price: false,
    colors: false,
    size: false,
    style: false

}

function reducer(state, action) {
    switch (action.type) {
        case "start":
            return {
                ...state, loading: "loader",

            }
        case "end":
            return { ...state, loading: "", products: action.payload }
        case "filterOpen":
            return { ...state, filter: !state.filter }
        case "priceOpen":
            return { ...state, price: !state.price }
        case "colorsOpen":
            return { ...state, colors: !state.colors }
        case "sizeOpen":
            return { ...state, size: !state.size }
        case "styleOpen":
            return { ...state, style: !state.style }
        default:
            throw new Error("Bizda bunday action yo'q")

    }
}

function All() {

    const [state, dispach] = useReducer(reducer, initialState)
    const navigate = useNavigate()
    // const [products, setProducts] = useState([])



    useEffect(() => {

        dispach({ type: "start" })
        fetch("https://shop-co-backend-1.onrender.com/api/products")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                dispach({ type: "end", payload: data })
            })
    }, [])
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
                            <div className="all-left__title-box" style={state.filter ? { marginBottom: "20px" } : { marginBottom: "0" }}>
                                <h2 className='all-left__title'>Filters</h2>
                                <button className='all-left__filter-btn' onClick={() => dispach({ type: "filterOpen" })}><img src={filterr} alt="" /></button>
                            </div>

                            {
                                state.filter && (
                                    <>
                                        <div className="all-left__type-box">
                                            <div className="all-left-type__inner">
                                                <button className='all-left-type-btn'>T-shirts <div><img src={next} alt="" /></div></button>
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
                                                <button className={state.price ? "all-left__open-btn price-active" : "all-left__open-btn"} onClick={() => dispach({ type: "priceOpen" })}><img src={isopen} alt="" /></button>
                                            </div>

                                            {
                                                state.price && (
                                                    <>
                                                        <form className='all-left-price__form' action="#">
                                                            <input type="range" className='all-left__price-inp' />
                                                        </form>
                                                    </>
                                                )
                                            }
                                        </div>


                                        <div className="all-left__colors-box" style={state.colors ? { paddingBottom: "20px" } : { paddingBottom: "0" }} >
                                            <div className="all-left__colors-inner">
                                                <h2 className='all-left-colors__title'>Colors</h2>
                                                <button className={state.colors ? "all-left__open-btn colors-active" : "all-left__open-btn"} onClick={() => dispach({ type: "colorsOpen" })}><img src={isopen} alt="" /></button>
                                            </div>
                                            {
                                                state.colors && (
                                                    <form className='all-left-colors__form' action="#">
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
                                                )
                                            }
                                        </div>

                                        <div style={state.size ? { paddingBottom: "20px" } : { paddingBottom: "0" }} className="all-left__size-box">
                                            <div className="all-left__size__inner">
                                                <h2 className='all-left__size-title'>Size</h2>
                                                <button className={state.size ? "all-left__open-btn size-active" : "all-left__open-btn"} onClick={() => dispach({ type: "sizeOpen" })}><img src={isopen} alt="" /></button>
                                            </div>
                                            {
                                                state.size && (
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
                                                )
                                            }
                                        </div>

                                        <div style={state.style ? { paddingBottom: "20px" } : { paddingBottom: "0" }} className="all-left__category-box">
                                            <div className="all-left__category-inner">
                                                <h2 className='all-left__category-title'>
                                                    Dress Style
                                                </h2>
                                                <button className={state.style ? "all-left__open-btn size-active" : "all-left__open-btn"} onClick={() => dispach({ type: "styleOpen" })}><img src={isopen} alt="" /></button>

                                            </div>
                                            {
                                                state.style && (
                                                    <div className="all-left__categories">
                                                        <button className="all-left__category">Casual <div><img src={next} alt="" /></div></button>
                                                        <button className="all-left__category">Formal <div><img src={next} alt="" /></div></button>
                                                        <button className="all-left__category">Party <div><img src={next} alt="" /></div></button>
                                                        <button className="all-left__category">Gym <div><img src={next} alt="" /></div></button>
                                                    </div>
                                                )
                                            }


                                        </div>

                                        <div className="all-left__submit-box" >
                                            <button className='all-left__btn'>Apply Filter</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="all__right">


                            <div className="all-right__title-box">
                                <h3 className='all-right__title'>Casual</h3>
                                <div className="all-right__inner-box">
                                    <p className='all-right__info'>Showing 1-10 of 100 Products</p>
                                    <select name="" id="">
                                        <option value="popular">Sort by: Most Popular</option>
                                    </select>
                                </div>
                            </div>

                            {
                                state.loading == "loader" && (
                                    <div className="loader-box">
                                        <div className={state.loading}>

                                        </div>
                                    </div>
                                )
                            }

                            <ul className="all-right__card">
                                {
                                    state.products.slice(0, 9).map((el) => (
                                        <li onClick={() => navigate(`/detail/${el._id}`)} key={el._id} className="all-right__item">
                                            <img width={295} height={298} src={el.images[0]} alt={el.title} />
                                            <h3 className='all-right__name'>{el.title}</h3>
                                            <div className="new__raiting__box">
                                                <div className="comment-stars">
                                                    {(() => {
                                                        // Average rating
                                                        const averageRating = el.comments.length
                                                            ? (
                                                                el.comments.map(r => Number(r.userRate))
                                                                    .reduce((sum, r) => sum + r, 0)
                                                                / el.comments.length
                                                            ).toFixed(1)
                                                            : "0";

                                                        return [1, 2, 3, 4, 5].map(star => (
                                                            <div className="star-wrapper" key={star}>
                                                                {/* Chap yarmi */}
                                                                <span
                                                                    className={averageRating >= star - 0.5 ? "star half active" : "star half"}
                                                                >
                                                                    ★
                                                                </span>
                                                                {/* To‘liq star */}
                                                                <span
                                                                    className={averageRating >= star ? "star full active" : "star full"}
                                                                >
                                                                    ★
                                                                </span>
                                                            </div>
                                                        ));
                                                    })()}
                                                </div>
                                                <p className='new__raitinbg'>
                                                    {el.comments.length
                                                        ? (
                                                            el.comments.map(r => Number(r.userRate))
                                                                .reduce((sum, r) => sum + r, 0)
                                                            / el.comments.length
                                                        ).toFixed(1)
                                                        : "0"
                                                    }/<span>5</span>
                                                </p>
                                            </div>
                                            <div className="new__price__box">
                                                <p className='new__price__actual'>{el.price ? "$" + el.price : "Left"}</p>
                                                <p className='new__price__old'> {
                                                    el.discount
                                                        ? "$" + Math.round(el.price / (1 - el.discount / 100))
                                                        : ""
                                                }</p>
                                                <p className='new__price__sell' style={!el.discount ? { display: 'none' } : {}}>{el.discount ? "-" + el.discount + "%" : ""}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                            <div className="all-right__page-box">
                                <button>&larr; Previous</button>

                                <ul className="all-right__page-list">
                                    <li className="all-right__pages">
                                        <button className='all-right__count'>1</button>
                                    </li>
                                    <li className="all-right__pages">
                                        <button className='all-right__count'>2</button>
                                    </li>
                                    <li className="all-right__pages">
                                        <button className='all-right__count'>3</button>
                                    </li>
                                    <li className="all-right__pages">
                                        <button className='all-right__count'>4</button>
                                    </li>
                                    <li className="all-right__pages">
                                        <button className='all-right__count'>5</button>
                                    </li>
                                </ul>

                                <button>Next &rarr;</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default All