import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'

function Default({ token, setToken }) {
  const [isPublic, setIsPublic] = useState(true)
  return (
    <>
      <Header token={token} setToken={setToken} isPublic={isPublic} />
      <main>
        <Hero isPublic={isPublic} />
      </main>
      <Footer />
    </>
  )
}

export default Default