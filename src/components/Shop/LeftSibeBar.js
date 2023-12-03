import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import { useSelector } from "react-redux";
const LeftSideBar = () => {
   
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];

    const setCurrentPage = (page) => {
        window.scrollTo(0, 0)
        if(page){
            setPage(page);
        }
    }

    const itemPerPage = 9;

    const [category, setCategory] = useState();
    const [label, setLabel] = useState();
    const [maxPrice, setMaxPrice] = useState(100);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState();

    const chooseCategory = (category) => {
        setCategory(category);
    };

    const chooseLabel = (label) => {
        setLabel(label);
    };

    const chooseSearch = (search) => {
        setSearch(search);
    };

    const chooseMaxPrice = (maxPrice) => {
        setMaxPrice(maxPrice);
    };

    useEffect(() => {
        let data = []
        if (!totalPage) {
            const isDecimal = products.length / itemPerPage > parseInt(products.length/itemPerPage)
            const pageCount = isDecimal ? parseInt(products.length/itemPerPage) + 1 : parseInt(products.length/itemPerPage)
            setTotalPage(pageCount)
        }
        data = category ? allData.filter((product) => product.category === category) : allData;
        data = label ? data.filter((product) => product.labels === label) : data;
        data = data.filter((product) => product.price < maxPrice)
        data = search ? data.filter((product) => product.title.includes(search)) : data;
        setProducts(data);
    }, [category, label, maxPrice, search])

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar chooseCategory={chooseCategory} chooseLabel={chooseLabel} chooseMaxPrice={chooseMaxPrice} chooseSearch={chooseSearch}/>
                        <div className="col-lg-9">
                            <div className="row">
                                {products.slice((page - 1) * itemPerPage, page * itemPerPage).map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard data={data} />
                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { setCurrentPage(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        {[...Array(totalPage).keys()].map((data, index) => (
                                            <li key={index} className={"page-item "+ (page === data + 1?"active":null)} onClick={(e) => { setCurrentPage(data + 1) }}><a className="page-link" href="#!">{data + 1}</a></li>
                                        ))}
                                        <li className="page-item" onClick={(e) => { setCurrentPage(page < totalPage ?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftSideBar
