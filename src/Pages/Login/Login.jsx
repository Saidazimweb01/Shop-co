import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./Login.css"
import { useTranslation } from 'react-i18next'

function Login({ setIsLoadingLog, isLoadingLog, setToken }) {

    const [userData, setUserData] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    function getUser(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    // console.log(userData);

    function login(e) {
        e.preventDefault()
        console.log(userData);

        setIsLoadingLog(true);
        fetch("https://shop-co-backend-1.onrender.com/api/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(
                userData
            ),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    setToken(data.token)
                    console.log(data);
                    toast.success(t("alerts.login"), {
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
                    setTimeout(() => navigate(`/${data.user.role}`), 1000);
                }
                else {
                    toast.error(t("errors.login"), {
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
                setIsLoadingLog(false);
            }).catch((err) => {
                console.log(err);

            })




    }

    const { t, i18n } = useTranslation()


    return (
        <>

            <div className='login__top'>
                <Link to={'/'}>{t("login.back")}</Link>
            </div>
            <div className="login__main">
                <div className='login__box'>
                    <form onSubmit={login} action="#">
                        <label htmlFor="email">{t("login.email")}</label>
                        <input name='email' type="email" required className='login__email' onChange={getUser} id='email' />
                        <label htmlFor="password">{t("login.password")}</label>
                        <input name='password' type="password" required className='login__password' onChange={getUser} id="password" />
                        <button type='submit' className='login__submit' >{isLoadingLog ? t("login.logspin") : t("login.loginin")}</button>
                    </form>
                    <Link to={"/register"}>{t("login.notacc")}</Link>
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

export default Login