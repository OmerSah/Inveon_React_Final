import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
import { addToCart, addToFavorites } from "../../../app/slices/product";
//Her bir ürünü temsil edecek
const ProductCard = (props) => {
        let dispatch=  useDispatch();

        let user = useSelector((state) => state.user.user);

        const sepeteEkle = async(product) => {
            console.log("tıklandı");
            const userId = user.id;
            const count = 1;
            dispatch(addToCart({ product, count, userId }))
        }
        
        const favorilereEkle = async(product) => {
            console.log("tıklandı");
            dispatch(addToFavorites({ userId: user.id, product: product }))
        }

        const labelValues = {
            "Trending" : "Trending",
            "Discount45Percent" : "45% OFF",
            "Discount50Percent" : "50% OFF",
            "Hot" : "Hot",
            "Upcoming" : "Upcoming",
            "Popular" : "Popular",
            "TopChoice" : "Top Choice",
            "BestSelling" : "Best Selling",
        }

        const categoryValues = {
            "Tshirts" : "T-shirts",
            "Fashion" : "Fashion",
            "Canta": "Çanta",
            "Ceket": "Ceket",
            "Ayakkabi": "Ayakkabı",
            "Jeans": "Jeans",
        }

    return(
        <>
         <div className="product_wrappers_one">
            <div className="thumb">
                 <Link to={`/product-details-two/${props.data.productId}`} className="image">
                    <img src={props.data.img} alt={props.data.title}></img>
                    <img className="hover-image" src={props.data.hover_img} alt={props.data.title} />
                 </Link>
                   <span className="badges">
                    <span className="text-danger" >
                        {labelValues[props.data.labels]} <br/>
                        {categoryValues[props.data.category]}
                    </span>
                   </span>
                   <div className="actions">
                     <a href="#!" className="action wishlist" title="Favorilere Ekle"
                      onClick={() => favorilereEkle(props.data)} ><AiOutlineHeart />

                     </a>
                 </div>
                 <button type="button" className="add-to-cart offcanvas-toggle" 
                    onClick={() => sepeteEkle(props.data)} >Sepete Ekle</button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${props.data.productId}`}>{props.data.title}</Link>
                </h5>
                <span className="price">
                    <span className="new">{props.data.price}.00 TL</span>
                </span>
             </div>
               
            </div>
        </>
    )
}

export default ProductCard