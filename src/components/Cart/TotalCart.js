import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const TotalCart = (props) => {
    let carts = useSelector((state) => state.products.cartDetails);
    let totalDiscount = useSelector((state) => state.products.totalDiscount);

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.count || 1) * item.product.price)
        }, 0)
    }
    return (
        <>
            {props.fullGrid ? (
                <div className="col-lg-12 col-md-12">
                    <div className="coupon_code right">
                        <h3>Toplam : </h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Alt Toplam : </p>
                                <p className="cart_amount">{cartTotal()}.00</p>
                            </div>
                            {totalDiscount ? 
                                <div className="cart_subtotal">
                                    <p>Toplam İndirim : </p>
                                    <p className="cart_amount">{totalDiscount}.00 TL</p>
                                </div> :
                                <></>
                            }
                            <div className="cart_subtotal ">
                                <p>Kargo</p>
                                <p className="cart_amount"><span style={{'textDecoration': 'line-through'}} >15.00</span>0.00 TL</p>
                            </div>
                            <a href="#!">Kargo Hesapla</a>

                            <div className="cart_subtotal">
                                <p>Toplam</p>
                                <p className="cart_amount">
                                    {totalDiscount ? 
                                    <span style={{'textDecoration': 'line-through'}}>{cartTotal()}</span>
                                    : <></> } 
                                    {cartTotal() - totalDiscount}.00 TL
                                </p>
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout-one" className="theme-btn-one btn-black-overlay btn_sm">
                                    Alışverişi Tamamla
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-lg-6 col-md-6">
                       <div className="coupon_code right">
                        <h3>Toplam : </h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Alt Toplam : </p>
                                <p className="cart_amount">{cartTotal()}.00 TL</p>
                            </div>
                            {totalDiscount ? 
                                <div className="cart_subtotal">
                                    <p>Toplam İndirim : </p>
                                    <p className="cart_amount">{totalDiscount}.00 TL</p>
                                </div> :
                                <></>
                            }
                            <div className="cart_subtotal ">
                                <p>Kargo : </p>
                                <p className="cart_amount"><span style={{'textDecoration': 'line-through'}} >15.00</span>0.00 TL</p>
                            </div>
                            <a href="#!">Kargo Hesapla</a>
                            <div className="cart_subtotal">
                                <p>Toplam : </p>
                                <p className="cart_amount">
                                    {totalDiscount ? 
                                    <span style={{'textDecoration': 'line-through'}}>{cartTotal()}</span>
                                    : <></> } 
                                    {cartTotal() - totalDiscount}.00 TL
                                </p>
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout-two" className="theme-btn-one btn-black-overlay btn_sm">
                                    Alışverişi Tamamla
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalCart
