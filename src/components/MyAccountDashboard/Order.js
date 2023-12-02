import React from 'react'
import { useSelector } from 'react-redux';

const Order = () => {
    
    let orders = useSelector((state) => state.products.orders);

    return (
        <>
            <div className="myaccount-content">
                <h4 className="title">Siparişlerim </h4>
                <div className="table_page table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Sipariş No</th>
                                <th>Tarih</th>
                                <th>Durum</th>
                                <th>Ürün Adeti</th>
                                <th>Toplam İndirim</th>
                                <th>Toplam</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.orderHeaderId}</td>
                                    <td>
                                        {new Intl.DateTimeFormat("tr-TR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(new Date(data.orderTime))}
                                    </td>
                                    <td><span className="badge badge-info">Tamamlandı</span></td>
                                    <td>{ data.cartTotalItems }</td>
                                    <td>{ data.discountTotal } TL</td>
                                    <td>{ data.orderTotal } TL</td>
                                   
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Order
