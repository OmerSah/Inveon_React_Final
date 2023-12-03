import React, { useEffect, useState } from 'react'
// Import Img
import search from '../../assets/img/svg/search.svg'
import { set } from 'react-hook-form'


const SideBar = ({ chooseCategory, chooseLabel, chooseMaxPrice }) => {

    const categories = [
        "T-shirts",
        "Fashion",
        "Çanta",
        "Ceket",
        "Ayakkabı",
        "Jeans",
    ]

    const categoryValues = {
        "T-shirts": "Tshirts",
        "Fashion": "Fashion",
        "Çanta": "Canta",
        "Ceket": "Ceket",
        "Ayakkabı": "Ayakkabi",
        "Jeans": "Jeans",
    }

    const labels = [
        "Trending",
        "45% OFF",
        "50% OFF",
        "Hot",
        "Upcoming",
        "Popular",
        "Top Choice",
        "Best Selling"
    ]

    const labelValues = {
        "Trending": "Trending",
        "45% OFF": "Discount45Percent",
        "50% OFF": "Discount50Percent",
        "Hot": "Hot",
        "Upcoming": "Upcoming",
        "Popular": "Popular",
        "Top Choice": "TopChoice",
        "Best Selling": "BestSelling"
    }

    const [category, setCategory] = useState()
    const [label, setLabel] = useState()
    const [maxPrice, setMaxPrice] = useState(100)

    const onCategoryChange = e => {
        chooseCategory(e.target.value)
        setCategory(e.target.value)
    }

    const onLabelChange = e => {
        chooseLabel(e.target.value)
        setLabel(e.target.value)
    }

    const onMaxPriceChange = e => {
        chooseMaxPrice(e.target.value)
        setMaxPrice(e.target.value)
    }

    const clearFilters = () => {
        chooseLabel('')
        setLabel('')
        chooseCategory('')
        setCategory('')
        chooseMaxPrice(200)
        setMaxPrice(200)
    }

    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form>

                            <input type="text" className="form-control" placeholder="Ara..."  />
                            <button><img src={search} alt="img" /></button>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Ürün Kategorileri</h4>
                        <form>
                                {categories.map((data, index) => (
                                    <label className="custom_boxed" key={index}> {data}
                                        <input type="radio" name="radio" value={categoryValues[data]}
                                            checked={category === categoryValues[data]}
                                            onChange={onCategoryChange} />
                                        <span className="checkmark"></span>
                                    </label>
                                ))}
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Fiyat</h4>
                        <div className="price_filter">
                            <input type="range" min="10" max="200" onChange={onMaxPriceChange} defaultValue={maxPrice} className="form-control-range" id="formControlRange" />
                            <div className="price_slider_amount mt-2">
                                <span>Fiyat : {maxPrice}.00 TL</span>
                            </div>
                        </div>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Etiketler</h4>
                        <form>
                            {labels.map((data, index) => (
                                <label className="custom_boxed" key={index}> {data}
                                    <input type="radio" name="radio" value={labelValues[data]}
                                        checked={label === labelValues[data]}
                                        onChange={onLabelChange} />
                                    <span className="checkmark"></span>
                                </label>
                            ))}
                            <div className="clear_button">
                                <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={clearFilters} >Filtreyi Temizle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
