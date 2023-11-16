import React from 'react'
import { Link } from 'react-router-dom'

const OrderComplete = () => {
    return (
        <>
            <section id="order_complet_area" className="ptb-100 ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="text-center order_complete">
                                <i className="fa fa-check-circle"></i>
                                <div className="order_complete_heading">
                                    <h2>Siparişiniz Alınmıştır</h2>
                                </div>
                                <p>Siparişiniz için teşekkür ederiz! Siparişiniz hazırlanıyor... </p>
                                <Link to="/shop" className="theme-btn-one bg-black btn_sm">Alışverişe Devam</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderComplete
