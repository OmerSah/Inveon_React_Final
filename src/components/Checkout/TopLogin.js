import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { applyCoupon, removeCoupon } from '../../app/slices/product';

const TopLogin = () => {
    let dispatch = useDispatch();

    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);
    let code = useSelector((state) => state.products.couponCode);

    const [couponCode, setCouponCode] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Coupon code is: ${couponCode}`)
        dispatch(applyCoupon({userId: user.id, couponCode}))
    }

    const removeUserCoupon = () => {
        dispatch(removeCoupon(user.id))
    }

    return (
        <>
            <div className="col-12">
                <div className="user-actions accordion">
                    <h3>
                        <i className="fa fa-file mr-2"></i>
                        Kupon Kodunuzu Giriniz
                        <a className="Returning ml-2" href="#!" data-toggle="collapse" data-target="#checkout_coupon"
                            aria-expanded="true">Kupon Kodu</a>
                    </h3>
                    <div id="checkout_coupon" className="collapse checkout_coupon" data-parent="#checkout_coupon">
                        <div className="checkout_info">
                            {
                                code ?
                                    <p className='text-danger'>&emsp;<strong onClick={removeUserCoupon} style={{ 'cursor': 'pointer' }}>{code}&ensp; X</strong></p>
                                    : <></>
                            }
                            <form onSubmit={handleSubmit}>
                                <input className="mb-2" placeholder="Kupon Kodu" type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} required />
                                <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Onayla</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopLogin