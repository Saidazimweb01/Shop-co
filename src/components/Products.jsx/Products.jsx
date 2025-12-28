import React, { useEffect, useState } from 'react'
import "./Product.css"
import { Link, useParams } from 'react-router-dom'
import img1 from "../../assets/product-1.svg"
import img2 from "../../assets/product-2.png"
import img3 from "../../assets/product-3.png"
import star from "../../assets/stars.svg"

function Products() {
    let { id } = useParams()
    const [count, setCount] = useState(0)
    const [size, setSize] = useState([])
    const ALL_SIZES = ["small", "medium", "large", "x-large"];
    const [mainImg, setMainImg] = useState("")



    // console.log(id);

    const [selectProducts, setSelectProducts] = useState([])
    const [url, setUrl] = useState(selectProducts.images)

    useEffect(() => {
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`).then((res) => {
            return res.json()
        })
            .then((data) => {
                setSelectProducts([data] || [])
                setSize(data.size)
                setUrl(data.images)
                setMainImg(data.images[0])
            })

    }, [])

    let averageRating;


    // console.log(selectProducts);


    return (
        <>
            <section className='details'>
                <div className="container">
                    {
                        selectProducts.map((el) => (
                            <div key={el.Id} className="details__link-box">
                                <Link to={"/user"}>Home &gt;</Link>
                                <Link to={"#"}>{el.title}</Link>
                            </div>
                        ))
                    }
                    <div className="details__main">
                        {
                            selectProducts.map((el, index) => (
                                el._id == id ? (
                                    <>
                                        <div key={el._id} className="details__left">
                                            <div className="details-left__box">

                                                {
                                                    el.images.map((img, index) => (
                                                        <div key={index} className="details-left__inner" onMouseOver={() => setMainImg(img)}>
                                                            <img className='details-left__img' width={152} height={167} src={img || "https://placehold.co/152x167"} alt="" />
                                                        </div>
                                                    ))
                                                }
                                                <div className="details-left__inner">
                                                    <img className='details-left__last-img' src={mainImg || "https://placehold.co/350x350"} alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div key={index} className="details__right">
                                            <h2 className='details-right__title'>{el.title}</h2>
                                            <div className="details-right__rating-box">
                                                {/* Product rating */}
                                                <div className="details-right__rating-box">
                                                    {selectProducts
                                                        .filter(el => el._id === id) // faqat hozirgi product
                                                        .map(el => {
                                                            // Average rating hisoblash
                                                            const averageRating = el.comments.length
                                                                ? (
                                                                    el.comments
                                                                        .map(r => Number(r.userRate))
                                                                        .reduce((sum, r) => sum + r, 0)
                                                                    / el.comments.length
                                                                ).toFixed(1)
                                                                : 0;

                                                            return (
                                                                <div key={el._id} className='raiting-box'>
                                                                    <div className="comment-stars">
                                                                        {[1, 2, 3, 4, 5].map(star => (
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
                                                                        ))}
                                                                    </div>
                                                                    <p>{averageRating}/<span>5</span></p>
                                                                </div>
                                                            )
                                                        })}
                                                </div>

                                            </div>
                                            <div className="details-right__price-box">
                                                <p className='details-right__price-actual'>{el.price ? "$" + el.price : "Left"}</p>
                                                <p className='details-right__price-old'>{
                                                    el.discount
                                                        ? "$" + Math.round(el.price / (1 - el.discount / 100))
                                                        : ""
                                                }</p>
                                                <p className='details-right__price-sell' style={!el.discount ? { display: 'none' } : {}}>{el.discount ? "-" + el.discount + "%" : ""}</p>
                                            </div>
                                            <p className='details-right__info'>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>
                                            <hr />
                                            <p className='details-right__color-title'>Select Colors</p>
                                            <div className="details-right__color-box">
                                                <input type="radio" className='details-right__colors' />
                                                <input type="radio" className='details-right__colors' />
                                                <input type="radio" className='details-right__colors' />
                                            </div>
                                            <hr />
                                            <p className='details-right__size-title'>Choose Size</p>
                                            {


                                                <>

                                                    <div key={(el._id)} className="details-right__size-box">
                                                        {
                                                            ALL_SIZES.map((s) => (
                                                                <button className={`${size.includes(s) ? "active" : ""} details-right__size-btn`}>{s}</button>
                                                            ))
                                                        }

                                                    </div>
                                                </>

                                            }
                                            <hr />
                                            <div className="details-right__buy-box">
                                                <div className="details-right__count-box">
                                                    <button className='details-right__counter' onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
                                                    <span className="details-right__count">{count}</span>
                                                    <button className='details-right__counter' onClick={() => setCount(count + 1)}>+</button>
                                                </div>

                                                <button className="details-right__buy-btn">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                                    :
                                    (
                                        <>

                                        </>
                                    )

                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products