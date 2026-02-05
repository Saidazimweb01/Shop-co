import { Link, Navigate, useNavigate } from "react-router-dom"
import "./Header.css"
import logo from "../../assets/logo.svg"
import closeIcone from "../../assets/close.svg"
import { useEffect, useState } from "react"
import profilee from "../../assets/profile.svg"
import basket from "../../assets/basket.svg"
import { jwtDecode } from "jwt-decode"
import burger from "../../assets/burger.svg"
import loop from "../../assets/head-loop.svg"
import { useTranslation } from "react-i18next"


export default function Header({ isPublic, token, setToken, }) {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState([])
    const [searchOpen, setSearchOpen] = useState(false)
    const [scroll, setScroll] = useState("head")
    const [scrollPublic, setScrollPublic] = useState("cite-header")
    const [countScroll, setCountScroll] = useState(0)
    const [isBurger, setIsBurger] = useState(false)
    const [profile, setProfile] = useState(false)
    const [login, setLogin] = useState(false)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (token) {
            let decoded = jwtDecode(token)
            setUserInfo(decoded)
        }
        else {
            setUserInfo([])
        }
    }, [token])

    useEffect(() => {

        function handleScroll() {
            if (window.scrollY > countScroll) {
                setScrollPublic("head back")
                setCountScroll(window.scrollY)
            }
            else {
                setScrollPublic("head")
                setCountScroll(window.scrollY)
            }


        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }


    }, [countScroll])


    useEffect(() => {

        function handleScroll() {
            if (window.scrollY > countScroll) {
                setScroll("cite-header back")
                setCountScroll(window.scrollY)
            }
            else {
                setScroll("cite-header")
                setCountScroll(window.scrollY)
            }


        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }


    }, [countScroll])



    function logOut() {
        let isSure = confirm(`${t("alerts.logout")}`)

        if (isSure) {
            localStorage.removeItem("token")
            setToken(null)
            navigate("/")
        }
    }

    return (
        <>
            {
                isPublic ? (
                    <header className={scrollPublic}>


                        {
                            isOpen ? (
                                <div className="cite-header__top">
                                    <div className="container">
                                        <div className="cite-header__top__box">
                                            <p>{t("public.header")} <Link to={"/register"}>{t("public.signnow")}</Link></p>
                                            <button onClick={() => setIsOpen(false)}><img src={closeIcone} alt="close button" /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                                :
                                (
                                    <>
                                    </>
                                )
                        }
                        <div className="cite-header__inner">
                            <div className="container">
                                <div className="cite-header__inner__box">
                                    <button className="cite-header__burger" onClick={() => setLogin(!login)}><img src={burger} alt="" /></button>
                                    <Link to={"/"}>
                                        <img src={logo} alt="Shop.co logo" />
                                    </Link>

                                    <div className="cite-header__sign__box">
                                        <Link to={"/login"}>{t("public.login")}</Link>
                                        <Link to={"/register"}>{t("public.signin")}</Link>
                                    </div>
                                </div>

                            </div>
                            {
                                login && (
                                    <div className={isOpen ? "cite-header__login-box" : "cite-header__login-box without-login"}>
                                        <ul className="cite-header__list">
                                            <li className="cite-header__item">
                                                <Link to={"/login"}>{t("public.login")}</Link>
                                                {/* <Link to={"/register"}>Sign up Now</Link> */}
                                            </li>
                                            <li className="cite-header__item">
                                                {/* <Link to={"/login"}>Login Now</Link>     */}
                                                <Link to={"/register"}>{t("public.signin")}</Link>
                                                {/* <Link to={"/register"}>Sign up Now</Link> */}
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </header>
                )
                    :
                    (
                        <>
                            <header className={scroll}>


                                {
                                    isOpen ? (
                                        <div className="cite-header__top">
                                            <div className="container">

                                                <div className={isPublic ? "cite-header__top__box" : "head__top__box"}>
                                                    <p className="">{t("head.order")}</p>
                                                    <button onClick={() => setIsOpen(false)}><img src={closeIcone} alt="close button" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                        :
                                        (
                                            <>
                                            </>
                                        )
                                }

                                <div className="head__inner">
                                    <div className="container">
                                        <div className="head__inner__box">
                                            {
                                                !searchOpen && <button onClick={() => setIsBurger(profile ? false : !isBurger)} className="head__burger">
                                                    <img src={burger} alt="" />
                                                </button>
                                            }
                                            {
                                                !searchOpen && <Link className="head__logo" to={"#"}>
                                                    <img src={logo} alt="Shop.co cite logo" />
                                                </Link>
                                            }


                                            <ul className="head__list">
                                                <li className="head__item">
                                                    <select className="head__select">
                                                        <option value="All " >{t("head.shop")}</option>
                                                        <option value="All">{t("head.all")}</option>
                                                    </select>
                                                </li>
                                                <li className="head__item">
                                                    <Link to={"#"} >{t("head.sale")}</Link>
                                                </li>
                                                <li className="head__item">
                                                    <Link to={"#"}>{t("head.new")}</Link>
                                                </li>
                                                <li className="head__item">
                                                    <Link to={"#"}>{t("head.brands")}</Link>
                                                </li>
                                            </ul>
                                            <div className="head__search__box">
                                                <input type="search" placeholder={t("head.search")} className="head__search" />
                                            </div>
                                            {
                                                searchOpen && <div className="head-search__box">
                                                    <input type="search" placeholder={t("head.order")} className="head-search" />
                                                </div>
                                            }

                                            <div className="head__icons">
                                                <button className="head__search__btn" onClick={() => setSearchOpen(!searchOpen)}><img src={loop} alt="" /></button>
                                                <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                                                    <option value="uz">UZ</option>
                                                    <option value="ru">RU</option>
                                                    <option value="en">EN</option>
                                                </select>
                                                <button onClick={() => navigate("/cart")}><img width={24} height={24} src={basket} alt="" /></button>
                                                <button onClick={() => setProfile(isBurger ? false : !profile)}><img width={24} height={24} src={profilee} alt="" /></button>

                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isBurger && (
                                            <div className={isOpen ? "head__nav-bar" : "head__nav-bar without-navbar"}>
                                                <div className="head__closed-box">
                                                    <button className="head__closed" onClick={() => setIsBurger(false)}>Close</button>
                                                </div>
                                                <ul className="head__cards">
                                                    <li className="head__boxs">
                                                        <select >
                                                            <option value="Shop">Shop</option>
                                                            <option value="All">All</option>
                                                        </select>
                                                    </li>
                                                    <li className="head__boxs">
                                                        <Link to={"#"} >On Sale</Link>
                                                    </li>
                                                    <li className="head__boxs">
                                                        <Link to={"#"}>New Arrivals</Link>
                                                    </li>
                                                    <li className="head__boxs">
                                                        <Link to={"#"}>Brands</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                    {
                                        profile && (
                                            <div className={isOpen ? "head__profile " : "head__profile without"}>

                                                <div className="head__close__box ">
                                                    <button className="head__close" onClick={() => setProfile(false)}>{t("profile.close")}</button>

                                                </div>
                                                <div className="head-profile__box">
                                                    <h3 className="head__firstName">{t("profile.name")} <span>{userInfo.firstName}</span></h3>


                                                    <h3>{t("profile.surname")} <span>{userInfo.lastName}</span></h3>
                                                    <h3>{t("profile.id")} <span>{userInfo.id}</span></h3>
                                                </div>
                                                <div className="head-profile__btn-box">
                                                    <button className="head__logout" onClick={() => logOut()}>{t("profile.logout")}</button>
                                                </div>
                                            </div>
                                        )
                                    }




                                </div>
                            </header>


                        </>
                    )
            }
        </>
    )
}