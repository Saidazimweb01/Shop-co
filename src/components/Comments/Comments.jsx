import React, { useEffect, useRef, useState } from 'react'
import "./Comments.css"
import right from "../../assets/right.svg"
import left from "../../assets/left.svg"
import status from "../../assets/status.svg"
import fiveStar from "../../assets/fiveStar.svg"
import { jwtDecode } from 'jwt-decode'

function Comments() {
    const listRef = useRef(null)
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState("")

    useEffect(() => {
        setLoad("loader")
        fetch("https://shop-co-backend-1.onrender.com/api/products").then((res) => {
            return res.json()
        })

            .then((data) => {
                setProducts(data || [])
                // console.log(data);

            }).finally(() => {
                setLoad("")
            })
    }, [])

    const scrollRight = () => {
        listRef.current.scrollBy({
            left: 400,
            behavior: "smooth",
        })
    }

    const scrollLeft = () => {
        listRef.current.scrollBy({
            left: -400,
            behavior: "smooth",
        })
    }



    const ratedComments = products
        .flatMap(p => p.comments || [])
        .filter(c => c.userRate >= 4.5)

    return (
        <>
            <section className="comments">
                <div className="container">
                    <div className="comments__box">
                        <h2 className=' comments__title'>OUR HAPPY CUSTOMERS</h2>
                        {
                            load !== "loader" && (
                                <div className="comments__manage">
                                    <button className='comments__left' onClick={scrollLeft}><img src={left} alt="" /></button>
                                    <button className='comments__right' onClick={scrollRight}><img src={right} alt="" /></button>
                                </div>
                            )
                        }
                    </div>

                    {
                        load == "loader" && (
                            <div className="loader-container">
                                <div className={load}></div>
                            </div>
                        )
                    }
                </div>

                <ul ref={listRef} className="comments__card" style={{
                    justifyContent: ratedComments.length <= 3 ? "center" : "space-between"
                }}>

                    {
                        products.map((el,) => (
                            el.comments.map((c) => c.userRate >= 4.5 && (
                                <li key={c._id} className="comments__item">
                                    <div className="comment-stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div className="star-wrapper" key={star}>
                                                <span
                                                    className={
                                                        c.userRate >= star - 0.5
                                                            ? "star half active"
                                                            : "star half"
                                                    }
                                                >
                                                    ★
                                                </span>

                                                <span
                                                    className={
                                                        c.userRate >= star
                                                            ? "star full active"
                                                            : "star full"
                                                    }
                                                >
                                                    ★
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="comments__status__bar">
                                        <h3 className='comments__name'>{c.user}</h3>
                                        <img src={status} alt="" />
                                    </div>
                                    <p className='comments__info' >{c.comment}</p>
                                </li>
                            ))
                        ))
                    }
                </ul>
            </section >
        </>
    )
}

export default Comments