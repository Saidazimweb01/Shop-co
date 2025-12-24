import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import NewProducts from '../../components/newProducts/NewProducts'

import Categories from '../../components/Categories/Categories'
import Comments from '../../components/Comments/Comments'

import Last from '../../components/Last/Last'
// import Hero from '../../components/Footer/Footer'



function Private({ token, setToken }) {
  const [isPublic, setIsPublic] = useState(false)



  return (

    <>
      <Header token={token} setToken={setToken} isPublic={isPublic} />
      <main>
        <Hero isPublic={isPublic} />
      </main>

      <Footer />
      <main>
        <NewProducts isPublic={isPublic} />

        <Categories isPublic={isPublic} />
        <Comments />

      </main>

      <Last />

    </>
  )
}

export default Private