import React, { useEffect, useState } from 'react'
import "./NewProducts.css"
import stars from "../../assets/stars.svg"
import tShirt from "../../assets/t-shirt.png"
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NewProducts({ isPublic }) {
    const [products, setProducts] = useState([])
    let navigate = useNavigate()
    const [load, setLoad] = useState("")

    useEffect(() => {
        setLoad("loader")
        fetch("https://shop-co-backend-1.onrender.com/api/products").then((res) => {
            return res.json()
        })
            .then((data) => {
                setProducts(data)
                if (data.length <= 1) {
                    setLoad("not")
                }
            }).finally(() => {
                setLoad("")
            })
    }, [])


    // console.log(products);


    const { t, i18n } = useTranslation()

    return (
        <>

            {
                !isPublic && (
                    <section className='new'>

                        <div className="container">
                            <h2 className='new__title'>{t("arrivals.title")}</h2>
                            {
                                load == "loader" && (
                                    <div className='loader-box'>
                                        <div className={load}></div>
                                    </div>
                                )
                            }
                            {
                                products.length > 1 ? (
                                    <>
                                        <ul className="new__list" style={products.length <= 3 ? { justifyContent: "center", gap: "50px" } : { justifyContent: "start" }}>

                                            {
                                                products.slice(0, 6).map((el) => (
                                                    <li key={el._id} className="new__item" onClick={() => navigate(`/detail/${el._id}`)

                                                    }>

                                                        <img width={295} height={298} src={el.images[0]} alt="" />
                                                        <h3 className='new__name'>{el.title}</h3>

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

                                        {
                                            products.length > 1 && <div className="new__bottom">
                                                <button className="new__view" onClick={() => navigate("/products")}>{t("arrivals.all")}</button>
                                            </div>
                                        }
                                    </>
                                )
                                    :

                                    (
                                        <>

                                        </>
                                    )
                            }
                        </div>

                    </section>
                )
            }
        </>
    )
}

export default NewProducts