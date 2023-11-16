import React from 'react'
import TopLogin from './TopLogin'
import YourOrder from './YourOrder'
const CheckOutTwo = () => {
    return (
        <>
            <section id="checkout_two" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <TopLogin />
                        <div className="col-lg-12">
                            <div className="checkout_area_two">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="checkout_form_area">
                                            <h3>Fatura Adresi</h3>
                                            <form action="#">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label >Adınız<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Soyadınız <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Şirket Adı<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label htmlFor="country">Ülke<span className="text-danger">*</span></label>
                                                            <select className="country_option nice-select wide form-control"
                                                                name="country" id="country">
                                                                <option defaultValue="2">Bangladesh</option>
                                                                <option defaultValue="3">Algeria</option>
                                                                <option defaultValue="4">Afghanistan</option>
                                                                <option defaultValue="5">Ghana</option>
                                                                <option defaultValue="6">Albania</option>
                                                                <option defaultValue="7">Bahrain</option>
                                                                <option defaultValue="8">Colombia</option>
                                                                <option defaultValue="9">Dominican Republic</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Cadde<span className="text-danger">*</span></label>
                                                            <input placeholder="Cadde Adı" type="text"
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <input placeholder="Numara"
                                                                type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Şehir<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Ülke<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Telefon <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label> Email Adresiniz<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="order-notes">
                                                            <label htmlFor="order_note">Sipariş Notunuz<span className="text-danger">*</span></label>
                                                            <textarea id="order_note"
                                                                placeholder=""
                                                                className="form-control" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <YourOrder />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CheckOutTwo