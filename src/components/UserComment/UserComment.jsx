import React, { useEffect, useState } from 'react'
import "./UserComment.css"
import stars from "../../assets/stars.svg"
import filter from "../../assets/filter.svg"
import more from "../../assets/more.svg"
import status from "../../assets/status.svg"
import { data, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { jwtDecode } from 'jwt-decode'

function UserComment() {

    let { id } = useParams()

    const [loadmore, setLoadMore] = useState(6)
    const [isOpen, setIsOpen] = useState("")
    const [selectStars, setSelectStars] = useState(1)
    const [products, setProducts] = useState([])
    const [userComment, setUserComment] = useState("")
    const [loadingComment, setLoadingComment] = useState("Comment")
    const [sortedComm, setSortedComm] = useState("Latest")
    const [filteredComm, setFilteredComm] = useState("")
    const [infoId, setInfoId] = useState(null)
    const [openMoreId, setOpenMoreId] = useState(null)

    // const [starsRate, setStarsRate] = useState("")

    let token = localStorage.getItem("token")

    function getComments() {
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
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
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`).then((res) => {
            return res.json()
        })
            .then((data) => {
                setProducts(data || [])
                console.log(data);

            })
    }, [])










    function comment(evt) {
        evt.preventDefault()

        setLoadingComment("Commenting...")
        fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}/comments`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                user: userName,
                userRate: selectStars == 0  ? 1 : selectStars,
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
                setLoadingComment("Comment")
            })

        console.log(products);

    }



    // console.log(comments);
    // console.log(new Date().toLocaleDateString());

    function handleStars(evt) {
        setSelectStars(evt.target.value)
    }

    console.log(selectStars);


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
                        <button className="raiting__tabs">Product Details</button>
                        <button className="raiting__tabs">Rating & Reviews</button>
                        <button className="raiting__tabs">FAQs</button>
                    </div>

                    <div className="raiting__filter-box">
                        <div className="raiting-filter__inner-box">
                            <h3 className='raiting__title'>All Reviews</h3>
                            <span className='raiting__count'>({products?.comments?.length || 0})</span>
                        </div>

                        <div className="raiting__filters">
                            <button className='raiting__filter-btn' onClick={() => setIsOpen("filter")}><img src={filter} alt="" /></button>
                            <select value={sortedComm} onChange={(e) => setSortedComm(e.target.value)} className='raiting__filter-sel'>
                                <option value="Latest">
                                    Latest
                                </option>
                                <option value="Old">Oldest</option>
                            </select>
                            <button onClick={() => setIsOpen("comment")}>Write a Review</button>
                        </div>
                    </div>

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

                                                                    }>More...</button>
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
                                        {loadmore > products.comments.length ? "Close" : "Load More Reviews"}
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

                            <p className="rating-text">Rating: {selectStars}</p>



                            <input maxLength={100} type="text" className='raiting-modal__comment' value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder='Write in here your comment' />
                            <p style={{ color: "#ccc", textAlign: "right" }}>{100 - userComment.length}/100</p>
                            <button className='raiting-modal__submit'>{loadingComment}</button>
                        </form>
                    </Modal>
                </div >
                <Modal isOpen={isOpen == "filter"} setIsOpen={setIsOpen}>
                    <div className="filter-modal__box">
                        <select value={filteredComm} onChange={(e) => setFilteredComm(e.target.value)}>
                            <option selected disabled>Choose filter</option>
                            <option value="az" >A-Z</option>
                            <option value="za">Z-A</option>
                            <option value="4">Start with Positivies</option>
                            <option value="3">Start with Negatives</option>
                        </select>
                        <button className='filter-modal__submit' onClick={() => {
                            setSortedComm(filteredComm)
                            setIsOpen("")
                        }


                        }>Filter</button>
                    </div>
                </Modal>
            </section >
        </>
    )
}

export default UserComment