import React from 'react'
import "./Detail.css"
import Products from '../../components/Products.jsx/Products'
import Header from '../../components/Header/Header'
import UserComment from '../../components/UserComment/UserComment'

function Detail() {
    return (
        <>
            <Header />
            <Products />
            <UserComment />
        </>
    )
}

export default Detail