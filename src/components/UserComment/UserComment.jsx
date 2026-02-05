import React, { useEffect, useState } from 'react'
import "./UserComment.css"
import stars from "../../assets/stars.svg"
import filter from "../../assets/filter.svg"
import more from "../../assets/more.svg"
import status from "../../assets/status.svg"
import { data, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { jwtDecode } from 'jwt-decode'
import { useTranslation } from 'react-i18next'

function UserComment() {

    const { t } = useTranslation()
    let { id } = useParams()

    const [loadmore, setLoadMore] = useState(6)
    const [isOpen, setIsOpen] = useState("")
    const [selectStars, setSelectStars] = useState(1)
    const [products, setProducts] = useState([])
    const [userComment, setUserComment] = useState("")
    const [loadingComment, setLoadingComment] = useState(t("details.sub.btn"))
    const [sortedComm, setSortedComm] = useState("Latest")
    const [filteredComm, setFilteredComm] = useState("")
    const [infoId, setInfoId] = useState(null)
    const [openMoreId, setOpenMoreId] = useState(null)
    const [load, setLoad] = useState("")
    const [activeTab, setActiveTab] = useState("details")
    const [faqsOpenId, setFaqsOpenId] = useState(null);
    // const [starsRate, setStarsRate] = useState("")

    let token = localStorage.getItem("token")

    function getComments() {
        setLoad("loader")
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            }).finally(() => {
                setLoad("")
            })
    }

    let userName = "Anonim"

    if (token) {
        try {
            const decoded = jwtDecode(token)
            userName = decoded.firstName
        } catch (err) {
            console.error("Invalid token", err)
        }
    }

    useEffect(() => {
        setLoad("loader")
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`).then((res) => {
            return res.json()
        })
            .then((data) => {
                setProducts(data)
                // console.log(data);

            }).finally(() => {
                setLoad("")
            })
    }, [id])









    function comment(evt) {
        evt.preventDefault()

        setLoadingComment(t("details.sub.btnspinner"))
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}/comments`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                user: userName,
                userRate: selectStars == 0 ? 1 : selectStars,
                posted: new Date().toISOString(),
                comment: userComment,
            }),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                getComments()
                setUserComment("")
                setIsOpen(false)
                setSelectStars(0)

            }).finally(() => {
                setLoadingComment(t("details.sub.btn"))
            })

        // console.log(products);

    }



    // console.log(comments);
    // console.log(new Date().toLocaleDateString());

    const faqs = [
        {
            id: 1,
            question: "What material is the hoodie made from?",
            answer: "This hoodie is made from a high-quality cotton-blend fabric that is soft, breathable, and durable."
        },
        {
            id: 2,
            question: "Is this hoodie suitable for all seasons?",
            answer: "Yes, it is perfect for year-round wear, providing warmth in cooler weather while remaining comfortable in mild temperatures."
        },
        {
            id: 3,
            question: "How should I wash the hoodie?",
            answer: "We recommend machine washing in cold water and air drying or tumble drying on low heat to maintain quality."
        },
        {
            id: 4,
            question: "Does the hoodie shrink after washing?",
            answer: "Minimal shrinkage may occur, but following the care instructions will help preserve the original fit."
        },
        {
            id: 5,
            question: "Is the hoodie true to size?",
            answer: "Yes, the hoodie is designed to fit true to size. For a looser fit, consider ordering one size up."
        },
        {
            id: 6,
            question: "Does it have pockets?",
            answer: "Yes, it features a spacious front kangaroo pocket for convenience and warmth."
        },
        {
            id: 7,
            question: "Is this hoodie suitable for casual and outdoor use?",
            answer: "Absolutely! It’s ideal for casual wear, workouts, travel, and light outdoor activities."
        }
    ];


    function handleStars(evt) {
        setSelectStars(evt.target.value)
    }

    // console.log(selectStars);


    let newSortedDate = products?.comments ? (
        [...products.comments].sort((a, b) => {
            if (sortedComm == "Latest") {
                return new Date(b.posted) - new Date(a.posted)
            }
            if (sortedComm == "Old") {
                return new Date(a.posted) - new Date(b.posted)
            }
            if (sortedComm == "az") {
                return a.comment.localeCompare(b.comment)
            }
            if (sortedComm == "za") {
                return b.comment.localeCompare(a.comment)
            }
            if (sortedComm == "4") {
                return b.userRate - a.userRate
            }
            if (sortedComm == "3") {
                return a.userRate - b.userRate
            }
        })
    )
        :
        (
            []
        )


    return (
        <>
            <section className="raiting">
                <div className="container">
                    <div className="raiting__tabs-box">
                        <button className={activeTab == "details" ? "raiting__tabs tabs-active" : "raiting__tabs"} onClick={() => setActiveTab("details")}>{t("details.details")}</button>
                        <button className={activeTab == "raiting" ? "raiting__tabs tabs-active" : "raiting__tabs"} onClick={() => setActiveTab("raiting")}>{t("details.comm")}</button>
                        <button className={activeTab == "faqs" ? "raiting__tabs tabs-active" : "raiting__tabs"} onClick={() => setActiveTab("faqs")}>{t("details.f")}</button>
                    </div>

                    {
                        activeTab == "details" && (
                            <>

                                <h3 style={{ textAlign: "center", marginBottom: "25px", fontSize: "30px" }}>{products.title} {t("details.title")}</h3>
                                <p className='details__text' style={{ color: "#969696ff", textAlign: "center" }}>{t("details.info")}</p>
                            </>
                        )
                    }

                    {
                        activeTab == "raiting" && (
                            <>
                                <div className="raiting__filter-box">
                                    <div className="raiting-filter__inner-box">
                                        <h3 className='raiting__title'>{t("details.length")}</h3>
                                        <span className='raiting__count'>({products?.comments?.length || 0})</span>
                                    </div>

                                    <div className="raiting__filters">
                                        <button className='raiting__filter-btn' onClick={() => setIsOpen("filter")}><img src={filter} alt="" /></button>
                                        <select value={sortedComm} onChange={(e) => setSortedComm(e.target.value)} className='raiting__filter-sel'>
                                            <option value="Latest">
                                                {t("details.latest")}
                                            </option>
                                            <option value="Old">{t("details.oldest")}</option>
                                        </select>
                                        <button onClick={() => setIsOpen("comment")}>{t("details.post")}</button>
                                    </div>
                                </div>


                                {
                                    load == "loader" && (
                                        <div className="loader-box">
                                            <div className={load}></div>
                                        </div>
                                    )
                                }
                                <ul className="raiting__card">
                                    {
                                        newSortedDate.slice(0, loadmore).map((el, index) => (
                                            <li className="raiting__item" key={index}>
                                                <div className='raiting__comment-box'>
                                                    <div className="comment-stars">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <div className="star-wrapper" key={star}>
                                                                <span
                                                                    className={
                                                                        el.userRate >= star - 0.5
                                                                            ? "star half active"
                                                                            : "star half"
                                                                    }
                                                                >
                                                                    ★
                                                                </span>

                                                                <span
                                                                    className={
                                                                        el.userRate >= star
                                                                            ? "star full active"
                                                                            : "star full"
                                                                    }
                                                                >
                                                                    ★
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className='raititng__more-btn' onClick={() => setOpenMoreId(openMoreId == el._id ? null : el._id)}><img src={more} alt="" /></button>
                                                    {
                                                        openMoreId == el._id && (
                                                            <div className='raiting-more__box'>
                                                                <ul className='raiting-more__list'>
                                                                    <li className="raiting-more__item">
                                                                        <button>✏️</button>
                                                                    </li>
                                                                    <li className="raiting-more__item">
                                                                        <button>🗑️</button>
                                                                    </li>
                                                                    {
                                                                        el.comment.length > 30 && (
                                                                            <li className="raiting-more__item">
                                                                                <button onClick={() => {
                                                                                    setInfoId(infoId == el._id ? null : el._id)
                                                                                    setOpenMoreId(null)
                                                                                }

                                                                                }>{t("details.more")}</button>
                                                                            </li>
                                                                        )
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="raiting__status-box">
                                                    <h3 className='raiting__name'>{el.user}</h3>
                                                    <img src={status} alt="" />
                                                </div>
                                                <p className={infoId == el._id ? "raiting__info full" : "raiting__info"}>
                                                    {el.comment}
                                                </p>

                                                <span className='raiting__data'> Posted on{" "}
                                                    {new Date(el.posted).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}</span>
                                            </li>
                                        ))
                                    }

                                </ul>



                                {
                                    products?.comments?.length >= 6 ? (
                                        <>
                                            <div className="raiting__view-box">
                                                <button className="raiting__view" onClick={() => {
                                                    if (loadmore >= products.comments.length) {
                                                        setLoadMore(6)
                                                    }
                                                    else {
                                                        setLoadMore(prev => prev + 6)
                                                    }
                                                }}>
                                                    {loadmore > products.comments.length ? t("details.close") : t("details.loadmore")}
                                                </button>
                                            </div>
                                        </>
                                    )
                                        :
                                        (
                                            <>

                                            </>
                                        )
                                }


                                <Modal isOpen={isOpen == "comment"} setIsOpen={setIsOpen}>
                                    <h2 className='raiting-modal__title'>{userName}'s comment</h2>

                                    <form onSubmit={comment} className='raiting-modal__form' action="#">
                                        <div className="star-rating">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <div className="star-wrapper" key={star}>
                                                    <span
                                                        className={selectStars >= star - 0.5 ? "star half active" : "star half"}
                                                        onClick={() => setSelectStars(star - 0.5)}
                                                    >
                                                        ★
                                                    </span>
                                                    <span
                                                        className={selectStars >= star ? "star full active" : "star full"}
                                                        onClick={() => setSelectStars(star)}
                                                    >
                                                        ★
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="rating-text">{t("details.sub.rating")} {selectStars}</p>



                                        <input maxLength={100} type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder={t("details.sub.write")} className="raiting-modal__comment" />
                                        <p style={{ color: "#ccc", textAlign: "right" }}>{100 - userComment.length}/100</p>
                                        <button className='raiting-modal__submit'>{loadingComment}</button>
                                    </form>
                                </Modal>
                                <Modal isOpen={isOpen == "filter"} setIsOpen={setIsOpen}>
                                    <div className="filter-modal__box">
                                        <select value={filteredComm} onChange={(e) => setFilteredComm(e.target.value)}>
                                            <option selected disabled>{t("details.sub.deff")}</option>
                                            <option value="az" >A-Z</option>
                                            <option value="za">Z-A</option>
                                            <option value="4">{t("details.sub.positive")}</option>
                                            <option value="3">{t("details.sub.negative")}</option>
                                        </select>
                                        <button className='filter-modal__submit' onClick={() => {
                                            setSortedComm(filteredComm)
                                            setIsOpen("")
                                        }


                                        }>{t("details.sub.filter")}</button>
                                    </div>
                                </Modal>
                            </>
                        )
                    }
                    {
                        activeTab == "faqs" && (
                            <>
                                <div className='faqs-box'>
                                    {
                                        faqs.map((el) => (
                                            <div key={el.id} className="faqs__item">
                                                <div className="faqs__top">
                                                    <h3 className='faqs__question'>{el.id}. {el.question}</h3>
                                                    <button className={faqsOpenId == el.id ? "faqs__open open-active" : "faqs__open"} onClick={() => faqsOpenId == el.id ? setFaqsOpenId(null) : setFaqsOpenId(el.id)}>{faqsOpenId == el.id ? "-" : "+"}</button>
                                                </div>
                                                {
                                                    faqsOpenId == el.id && (
                                                        <div className="faqs__bottom">
                                                            <p className='faqs__answer'>{el.answer}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }

                                </div>
                            </>
                        )
                    }
                </div >
            </section >
        </>
    )
}

export default UserComment