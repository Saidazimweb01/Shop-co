import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from 'react-i18next'

function Register({ isLoadingUp, setIsLoadingUp }) {

    const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" })
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    function getUser(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(userData);

        setIsLoadingUp(true)

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
                    toast.success(t("alerts.create"), {
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
                    toast.error(t("errors.create"), {
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
                setIsLoadingUp(false)
            })
    }

    return (
        <>

            <div className='register__top'>
                <Link to={"/login"}>{t("register.back")}</Link>
            </div>
            <div className='register__main'>
                <div className="register__box">
                    <form onSubmit={handleSubmit} action="#">
                        <label htmlFor="name">
                            {t("register.name")}
                        </label>
                        <input type="text" onChange={getUser} name="firstName" id="name" required />
                        <label htmlFor="surname">
                            {t("register.surname")}
                        </label>
                        <input type="text" onChange={getUser} name="lastName" id="surname" required />
                        <label htmlFor="email">
                            {t("register.email")}
                        </label>
                        <input type="email" onChange={getUser} name="email" id="email" required />
                        <label htmlFor="password">
                            {t("register.password")}
                        </label>
                        <input type="password" onChange={getUser} name="password" id="password" required />
                        <button type='submit'>{isLoadingUp ? t("register.createspin") : t("register.create")}</button>
                    </form>
                    <Link to={"/login"}>{t("register.haveacc")}</Link>
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