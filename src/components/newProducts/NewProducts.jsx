import React, { useEffect, useState } from 'react'
import "./NewProducts.css"
import stars from "../../assets/stars.svg"
import tShirt from "../../assets/t-shirt.png"
import { Navigate, useNavigate } from 'react-router-dom'

function NewProducts({ isPublic }) {
    const [products, setProducts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        fetch("https://shop-co-backend-1.onrender.com/api/products").then((res) => {
            return res.json()
        })
            .then((data) => {
                setProducts(data || [])
            })
    }, [])


    // console.log(products);


    return (
        <>
            {
                !isPublic && (
                    <section className='new'>
                        <div className="container">
                            <h2 className='new__title'>NEW ARRIVALS</h2>
                            <ul className="new__list">

                                {
                                    products.slice(0, 6).map((el) => (
                                        <li key={el._id} className="new__item" onClick={() => navigate(`/detail/${el._id}`)}>

                                            <img width={295} height={298} src={el.images[0]} alt="" />
                                            <h3 className='new__name'>{el.title}</h3>
                                            <div className="new__raiting__box">
                                                <img width={104} height={18} src={stars} alt="Stars" />
                                                <p className='new__raitinbg'>
                                                    {
                                                        el.comments.length ? (
                                                            el.comments.map(r => Number(r.userRate))
                                                                .reduce((sum, total) => {
                                                                    sum + total / sum.length
                                                                    return total
                                                                }, 0)
                                                        ).toFixed(1)
                                                        :
                                                        (
                                                            "0"
                                                        )
                                                            
                                                    }

                                                    /<span>5</span></p>
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
                                    <button className="new__view">View All</button>
                                </div>
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default NewProducts