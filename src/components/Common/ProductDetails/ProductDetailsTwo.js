import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import { useEffect } from "react";
import { addToCart, addToFavorites, fetchProduct } from '../../../app/slices/product';

const ProductDetailsTwo = () => {
    let dispatch = useDispatch();
    let { id } = useParams();

    let product = useSelector((state) => state.products.single);
    let isLoading = useSelector((state) => state.products.isLoading);
    let isError = useSelector((state) => state.products.isError);
    let user = useSelector((state) => state.user.user);

    useEffect(() => {
        setCount(1)
        dispatch(fetchProduct(id))
    }, [dispatch, id]);

    // Add to cart
    const sepeteEkle = async () => {
        dispatch(addToCart({ userId: user.id, product: product, count }))
    }

    // Add to Favorite
    const addToFav = async () => {
        dispatch(addToFavorites({ userId: user.id, product: product }))
    }

    // Quenty Inc Dec
    const [count, setCount] = useState(1)
    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            alert("Stokta Yok!")
            setCount(0)
        }
    }
    const [img, setImg] = useState()
    const colorSwatch = (i) => {
        let data = product.color.find(item => item.color === i)
        setImg(data.img)
    }

    let settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <>{!isLoading
            ?
            !isError && product ?
                <section id="product_single_two" className="ptb-100">
                    <div className="container">
                        <div className="row area_boxed">
                            <div className="col-lg-4">
                                <div className="product_single_two_img slider-for">
                                    <Slider {...settings}>
                                        <div className="product_img_two_slider">
                                            <img src={img} alt="img" />
                                        </div>
                                        <div className="product_img_two_slider">
                                            <img src={product.hover_img} alt="img" />
                                        </div>
                                        {
                                            product.colors.map((item, index) => (
                                                <div className="product_img_two_slider" key={index}>
                                                    <img src={item.img} alt="img" />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="product_details_right_one">
                                    <div className="modal_product_content_one">
                                        <h3>{product.title}</h3>
                                        <div className="reviews_rating">
                                            <RatingStar maxScore={5} rating={product.rating.rate} id="rating-star-common-2" />
                                            <span>({product.rating.count} Müşteri Yorumları)</span>
                                        </div>
                                        <h4>{product.price}.00 TL <del>{parseInt(product.price) + 17}.00 TL</del> </h4>
                                        <p>{product.description}</p>
                                        <div className="customs_selects">
                                            <select name="product" className="customs_sel_box">
                                                <option value="">Beden</option>
                                                <option value="small">S</option>
                                            <option value="medium">M</option>
                                            <option value="learz">L</option>
                                            <option value="xl">XL</option>
                                        </select>
                                    </div>
                                    <div className="variable-single-item">
                                        <span>Renk</span>
                                        <div className="product-variable-color">
                                            <label htmlFor="modal-product-color-red1">
                                                <input name="modal-product-color" id="modal-product-color-red1"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('red') }} defaultChecked/>
                                                <span className="product-color-red"></span>
                                            </label>
                                            <label htmlFor="modal-product-color-green3">
                                                <input name="modal-product-color" id="modal-product-color-green3"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('green') }} />
                                                <span className="product-color-green"></span>
                                            </label>
                                            <label htmlFor="modal-product-color-blue5">
                                                <input name="modal-product-color" id="modal-product-color-blue5"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('blue') }} />
                                                <span className="product-color-blue"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={decNum}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control" type="number" value={count} readOnly />
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={incNum}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="links_Product_areas">
                                            <ul>
                                                <li>
                                                    <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav()}><i
                                                        className="fa fa-heart"></i>Favorilere Ekle</a>
                                                </li>

                                            </ul>
                                            <a href="#!" className="theme-btn-one btn-black-overlay btn_sm"
                                                onClick={() => sepeteEkle()}>Sepete Ekle</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductInfo />
                    </div>
                </section>
                :
                <div className="container ptb-100">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                            <div className="empaty_cart_area">
                                <img src={img} alt="img" />
                                <h2>Ürün Bulunamadı</h2>
                                <Link to="/shop" className="btn btn-black-overlay btn_sm">Alışverişe Devam</Link>
                            </div>
                        </div>
                    </div>
                </div>
            :
            <p>Yükleniyor...</p>
        }
            <RelatedProduct />
        </>
    )
}

export default ProductDetailsTwo