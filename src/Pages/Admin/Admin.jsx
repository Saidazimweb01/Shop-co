import React, { useEffect, useState } from 'react'
import { data, Form, Link, Navigate, useNavigate } from 'react-router-dom'
import "./Admin.css"
import logo from "../../assets/logo.svg"
import Modal from '../../components/Modal/Modal'

function Admin({ setToken, token }) {
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()

  const [imagePreviews, setImagePreviews] = useState([])

  const [addProduct, setAddProduct] = useState({
    title: "",
    price: "",
    discount: "",
    category: "",
    type: "",
    size: [],
    colors: [],
    images: [],
  })


  function logOut() {
    let isSure = confirm("Siz admin accauntidan chiqmoqchimisiz?")

    if (isSure) {
      localStorage.removeItem("token")
      setToken(null)
      navigate("/")
    }
  }

  useEffect(() => {
    fetch("https://shop-co-backend-1.onrender.com/api/products").then((res) => {
      return res.json()
    })
      .then((data) => {
        setProducts(data || [])
      })
  }, [])



  function getProducts() {
    fetch(`https://shop-co-backend-1.onrender.com/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }

  function deleteProduct(id, title) {
    let isSure = confirm(`Siz rostdan ham ${title} ni o'chirmoqchimisiz?`)

    if (isSure) {
      fetch(`https://shop-co-backend-1.onrender.com/api/products/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          console.log(data);
          getProducts()
        })
    }
    else {

    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(addProduct).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    console.log(addProduct);

    const res = await fetch(
      "https://shop-co-backend-1.onrender.com/api/products/with-images",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Product qo‘shilmadi");
    }

    const data = await res.json();
    console.log(data);

    setIsOpen(false)

    getProducts()
    setAddProduct({
      title: "",
      price: "",
      discount: "",
      category: "",
      type: "",
      size: [],
      colors: [],
      images: [],
    });
    setImagePreviews([])

  }


  const handleChange = (e) => {
    const { id, value } = e.target;

    setAddProduct((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAddProduct(prev => ({
      ...prev,
      images: [...prev.images, file],
    }));

    setImagePreviews(prev => [...prev, URL.createObjectURL(file)]);
  };

  const handleColorChange = (e) => {
    setAddProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, e.target.value],
    }));
  };

  const handleSizeChange = (e) => {
    const { id, checked } = e.target;

    setAddProduct(prev => ({
      ...prev,
      size: checked
        ? [...prev.size, id]
        : prev.size.filter(s => s !== id)
    }));
  };


  return (
    <>
      <main>
        <section className="admin">
          <div className="admin__main">
            <div className="admin__left left">
              <Link to={"#"}>
                <img src={logo} alt="" />
              </Link>

              <div className="admin-left__tabs">
                <button>Dashboard</button>
                <button>Products</button>
                <button>Types</button>
                <hr />
                <button className='admin-left__log' onClick={() => logOut()}>Log out</button>
              </div>
            </div>


            <div className="admin__right right">
              <div className="admin-right__inner">
                <div className="admin-right__title-box">
                  <h2 className='admin-right__main-title'>All products</h2>
                  <button className='admin-right__add' onClick={() => setIsOpen(true)}>+ Add product</button>
                </div>
                <div className="admin-right__wrapper">
                  <div className="table-container">
                    <table className='admin-right__table'   >
                      <tbody className='admin-right__names'>

                        <tr>
                          <th>ID</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Rate</th>
                          <th>Actions</th>
                        </tr>

                      </tbody>


                      <tbody className='admin-right__products'>

                        {
                          products.map((el) => (
                            <tr key={el._id}>

                              <td>{el._id}</td>
                              <td className='admin-right__product-img'><img src={el.images[0]} alt="product" /></td>
                              <td className='admin-right__title'><p>{el.title}</p></td>
                              <td>{el.price ? el.price + "$" : "Don't have price"}</td>
                              <td>{el.discount ? el.discount + "%" : "Don't have discount"}</td>
                              <td>{el.comments.length > 0
                                ? (
                                  el.comments
                                    .map(c => +c.userRate) // parseFloat o‘rniga +
                                    .reduce((sum, total) => {
                                      sum + total / sum.length
                                      return total
                                    }, 0)
                                ).toFixed(1)
                                : "0"
                              } 🌟</td>
                              <td>
                                <button>✏️</button>
                                <button onClick={() => deleteProduct(el._id, el.title)}>🗑️</button>
                              </td>

                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} >

          <form onSubmit={handleSubmit} className='admin-modal__form' action="#">
            <h2 className='admin-modal__title'>Adding New Product</h2>

            <div className='admin-modal-name__inner'>
              <label htmlFor="title">
                Product Name:
              </label>
              <input type="text" onChange={handleChange} className='admin-modal__name' id="title" />
            </div>
            <div className="admin-modal__images-box">
              <label htmlFor="">
                Upload Images Of Product:
              </label>
              <div className="admin-modal-images__inner">
                <input onChange={handleImageChange} name='images' hidden type="file" className='admin-modal__img' id="img2" />
                <label className='admin-modal__card' htmlFor="img2">
                  {
                    imagePreviews[0] ? <img src={imagePreviews[0]} /> : <> <span className="admin-modal__icon">⬆️</span>
                      <span>Upload</span></>
                  }
                </label>
                <input onChange={handleImageChange} hidden type="file" className='admin-modal__img' id="img1" />
                <label className='admin-modal__card' htmlFor="img1">
                  {
                    imagePreviews[1] ? <img src={imagePreviews[1]} /> : <> <span className="admin-modal__icon">⬆️</span>
                      <span>Upload</span></>
                  }
                </label>
                <input onChange={handleImageChange} hidden type="file" className='admin-modal__img' id="img3" />
                <label className='admin-modal__card' htmlFor="img3">
                  {
                    imagePreviews[2] ? <img src={imagePreviews[2]} /> : <> <span className="admin-modal__icon">⬆️</span>
                      <span>Upload</span></>
                  }

                </label>
              </div>
            </div>

            <div className="admin-modal__price-box">
              <div className="admin-modal-price__inner">
                <label htmlFor="price">
                  Price ($):
                </label>
                <input onChange={handleChange} type="number" id="price" />
              </div>
              <div className="admin-modal-sell__inner">
                <label htmlFor="discount">
                  Discount (%):
                </label>
                <input onChange={handleChange} type="number" id="discount" />
              </div>
            </div>

            <div className="admin-modal__info-box">
              <div className="admin-modal-category__inner">
                <label htmlFor="category">
                  Category:
                </label>

                <select id="category" onChange={handleChange}>
                  <option selected disabled>Select</option>
                  <option value="gym">GYM</option>
                  <option value="party">Party</option>
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div className="admin-modal-type__inner">
                <label htmlFor="type">
                  Type:
                </label>

                <select id="type" onChange={handleChange}>
                  <option selected disabled >Select</option>
                  <option value="gym">GYM</option>
                  <option value="party">Party</option>
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
            </div>

            <label className='admin-modal__size-title' htmlFor="">
              Sizes:
            </label>
            <div className="admin-modal__size-box">
              <div className="admin-modal-size__inner">
                <input type="checkbox" id="small" onChange={handleSizeChange} />
                <label htmlFor="small">
                  Small
                </label>

              </div>
              <div className="admin-modal-size__inner">
                <input type="checkbox" onChange={handleSizeChange} id="medium" />
                <label htmlFor="medium">
                  Medium
                </label>

              </div>
              <div className="admin-modal-size__inner">
                <input type="checkbox" id="large" onChange={handleSizeChange} />
                <label htmlFor="large">
                  Large
                </label>

              </div>
              <div className="admin-modal-size__inner">
                <input type="checkbox" id="x-l" onChange={handleSizeChange} />
                <label htmlFor="x-l">
                  X-Large
                </label>

              </div>

            </div>

            <label className='admin-modal__color-title' >
              Colors:
            </label>

            <label className='admin-modal__check-box'>
              <input className='admin-modal__color' type="color" onChange={handleColorChange} id="" />
              <span className='admin-modal__check'></span>
            </label>

            <div className='admin-modal__submit-box'>
              <button type='submit'>+ Add product</button>
            </div>

          </form>
        </Modal>
      </main>
    </>
  )
}

export default Admin