import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function Register({ isLoadingUp, setIsLoadingUp }) {

    const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" })

    const navigate = useNavigate()
    function getUser(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(userData);

        setIsLoadingUp("Creating account...")

        fetch("https://shop-co-backend-1.onrender.com/api/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(userData)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.token) {
                    console.log(data);
                    toast.success('Muvaffaqiyatli account  yaratildi!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => navigate("/login"), 1000)
                }
                else {
                    toast.error('Bunday account allaqachon mavjud!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }

            })
            .finally(() => {
                setIsLoadingUp("Create account")
            })
    }

    return (
        <>
            <div className='register__top'>
                <Link to={"/login"}>Back</Link>
            </div>
            <div className='register__main'>
                <div className="register__box">
                    <form onSubmit={handleSubmit} action="#">
                        <label htmlFor="name">
                            First Name
                        </label>
                        <input type="text" onChange={getUser} name="firstName" id="name" required />
                        <label htmlFor="surname">
                            Last Name
                        </label>
                        <input type="text" onChange={getUser} name="lastName" id="surname" required />
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" onChange={getUser} name="email" id="email" required />
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" onChange={getUser} name="password" id="password" required />
                        <button type='submit'>{isLoadingUp}</button>
                    </form>
                    <Link to={"/login"}>I have account!</Link>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}

export default Register