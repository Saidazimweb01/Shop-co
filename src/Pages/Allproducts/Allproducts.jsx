import React from 'react'
import Header from '../../components/Header/Header'
import All from '../../components/All/All'
import Last from '../../components/Last/Last'

function Allproducts({ token, setToken }) {
    return (
        <>
            <Header token={token} setToken={setToken} />
            <All />
            <Last />
        </>
    )
}

export default Allproducts