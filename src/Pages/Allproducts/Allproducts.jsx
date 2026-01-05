import React from 'react'
import Header from '../../components/Header/Header'
import All from '../../components/All/All'

function Allproducts({ token, setToken }) {
    return (
        <>
            <Header token={token} setToken={setToken} />
            <All />
        </>
    )
}

export default Allproducts