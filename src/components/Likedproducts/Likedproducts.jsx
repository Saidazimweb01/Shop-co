import React, { useEffect, useState } from 'react'
import "./Likedproducts.css"
import tshirt from "../../assets/t-shirt2.png"
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Likedproducts() {
    let { id } = useParams()
    const [likeProducts, setLikeProducts] = useState([])
    const [load, setLoad] = useState("")
    let navigate = useNavigate()
    useEffect(() => {
        setLoad("loader")
        fetch("https://shop-co-backend-1.onrender.com/api/products/")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setLikeProducts(data || [])
            }).finally(() => {
                setLoad("")
            })
    }, [id])
    console.log(likeProducts);


    const { t } = useTranslation()

    return (
        <>
            <section className='like'>
                <div className="container">
                    <h2 className='like__title'>{t("details.subtitle")}</h2>
                    {
                        !likeProducts.length && (
                            <div className="loader-box">
                                <div className={load}></div>
                            </div>
                        )
                    }
                    <ul className="like__card">
                        {
                            likeProducts.filter((f) => f._id !== id)
                                .slice(0, 6)
                                .map((el) => (
                                    <li className='like__item' key={el._id} onClick={() => navigate(`/detail/${el._id}`)}>
                                        <img width={295} height={298} src={el.images[0]} alt={el.title} />
                                        <h3 className='like__name'>{el.title}</h3>
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
                </div>
            </section>
        </>
    )
}

export default Likedproducts