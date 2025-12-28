import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'

function Default({ setToken, token }) {
  const [isPublic, setIsPublic] = useState(true)
  return (
    <>
      <Header setToken={setToken} token={token} isPublic={isPublic} />
      <main>
        <Hero isPublic={isPublic} />
      </main>
      <Footer />
    </>
  )
}

export default Default