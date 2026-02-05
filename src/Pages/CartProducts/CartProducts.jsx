import React from 'react'
import Header from '../../components/Header/Header'

function CartProducts({ token, setToken,  }) {
    return (
        <>
            <Header token={token} setToken={setToken}  />
        </>
    )
}

export default CartProducts