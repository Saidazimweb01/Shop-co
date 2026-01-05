import React from 'react'
import "./Detail.css"
import Products from '../../components/Products.jsx/Products'
import Header from '../../components/Header/Header'
import UserComment from '../../components/UserComment/UserComment'
import Last from '../../components/Last/Last'
import Likedproducts from '../../components/Likedproducts/Likedproducts'

function Detail({ token, setToken }) {
    return (
        <>
            <Header token={token} setToken={setToken} />
            <Products />
            <UserComment />
            <Likedproducts />
            <Last />
        </>
    )
}

export default Detail