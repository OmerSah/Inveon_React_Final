import Heading from "../Heading"
import React from "react"
import {useSelector}  from "react-redux";
import ProductCard from "../../../components/Common/Product/ProductCard"; 
const HotProduct = () => {
     
         let TumUrunler =  useSelector((state)=> state.products.products);

    return(
        <>
        <section id="hot-Product_area" className="ptb-100">
             <div className="container">
                <Heading baslik="Yeni Ürünler" 
                 altBaslik="Herkesin BT Shop tan Alışveriş Yaptığını Görün" />
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="tabs_center_button">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" href="#new_arrival" className="active">Yeni Gelen Ürünler</a></li>
                            <li><a data-toggle="tab" href="#trending">Trend</a></li>
                            <li><a data-toggle="tab" href="#best_sellers">En Çok Satanlar</a></li>
                            <li><a data-toggle="tab" href="#featured">Öne  Çıkanlar</a></li>
                            <li><a data-toggle="tab" href="#on_sall">Satışta</a></li>
                        </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="tabs_el_wrapper">
                        <div className="tab-content">
                            <div id="new_arrival" className="tab-pane fade show in active">
                                <div className="row">
                               {TumUrunler.slice(0,4).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="trending" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(3,5).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="best_sellers" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(4,7).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="featured" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(5,9).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="on_sall" className="tab-pane fade">
                            <div className="row">
                               {TumUrunler.slice(2,7).map((urun,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <ProductCard data={urun} />
                                    </div>
                               ))}
                               </div>
                            </div>
                        </div>
                    </div>
                  </div>
                 </div>
             </div>
        </section>
        </>
    )
}

export default HotProduct