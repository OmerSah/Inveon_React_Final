import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { applyCoupon, removeCoupon } from '../../app/slices/product';

const Coupon = () => {
    
    let dispatch = useDispatch();
    
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
            <div className="col-lg-6 col-md-6">
                <div className="coupon_code left">
                    <h3>Kupon</h3>
                    <div className="coupon_inner">
                        <p>Kupon Kodu Giriniz</p>
                        {
                            code ?
                                <p className='text-danger'>&emsp;<strong onClick={removeUserCoupon} style={{'cursor': 'pointer'}}>{code}&ensp; X</strong></p>
                                : <></>
                        }
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="mb-2" placeholder="Coupon code"  required />
                            <button type='submit' className="theme-btn-one btn-black-overlay btn_sm">Onayla</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupon