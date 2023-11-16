import React from 'react'
import { Link } from 'react-router-dom'
const Order = () => {
    return (
        <>
            <div className="myaccount-content">
                <h4 className="title">Siparişlerim </h4>
                <div className="table_page table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Sipariş</th>
                                <th>Tarih</th>
                                <th>Durum</th>
                                <th>Toplam</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>5 Haziran 2005</td>
                                <td><span className="badge badge-info">Tamamlandı</span></td>
                                <td>250 TL  </td>
                                <td><Link to="/order-success" className="view">Görüntüle</Link></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>1 Mayıs 2018</td>
                                <td> <span className="badge badge-warning">Devam Ediyor</span></td>
                                <td>170 TL  </td>
                                <td><Link to="/order-tracking" className="view">Görüntüle</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Order
