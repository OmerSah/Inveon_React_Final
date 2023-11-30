import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
const YourOrder = () => {

    let carts = useSelector((state) => state.products.cartDetails);
    let totalDiscount = useSelector((state) => state.products.totalDiscount);

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.count || 1) * item.product.price)
        }, 0)
    }

    return (
        <>
            <div className="col-lg-6 col-md-6">
                <h3>Siparişiniz</h3>
                <div className="order_table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Ürün</th>
                                <th>Toplam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((data, index) => (
                                <tr key={index}>
                                    <td> {data.product.title} <strong> × {" " + data.count || 1}</strong></td>
                                    <td> {data.product.price * (data.count || 1)}.00 TL</td>
                                </tr>
                            ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Alt Toplam</th>
                                <td>{cartTotal()}.00 TL</td>
                            </tr>
                            {totalDiscount ? 
                                <tr>
                                    <th>Toplam İndirim</th>
                                    <td>{totalDiscount}.00 TL</td>
                                </tr> :
                                <></>
                            }
                            <tr>
                                <th>Kargo</th>
                                <td><span style={{'textDecoration': 'line-through'}} >15.00</span>&nbsp;&nbsp;<strong>0.00 TL</strong></td>
                            </tr>
                            <tr className="order_total">
                                <th>Sipariş Toplamı </th>
                                <td>
                                    {totalDiscount ? <span style={{'textDecoration': 'line-through'}}>{cartTotal()}</span>: <></> }
                                    &ensp;
                                    <strong>{cartTotal() - totalDiscount}.00 TL</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="payment_method">
                    <form>
                        <div className="accordion" id="accordionExample">
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingOne">
                                    <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                        <input type="radio" name="payment" id="html" value="HTML" defaultChecked />
                                        <label htmlFor="html">Para Transferi</label>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Bank Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingTwo">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                        <input type="radio" name="payment" id="javascript" value="JavaScript" />
                                        <label htmlFor="javascript">Mobile Bankacılık</label>
                                    </div>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>Direct Mobile Transfer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id="headingThree">
                                    <div className="collapsed" data-toggle="collapse" data-target="#collapseThree">
                                        <input type="radio" name="payment" id="css" value="JavaScript" />
                                        <label htmlFor="css">Paypal</label>
                                    </div>
                                </div>
                                <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="order_button pt-3">
        
                        <Link to="/order-complete" className="theme-btn-one btn-black-overlay btn_sm">
                                Sipariş Ver</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YourOrder