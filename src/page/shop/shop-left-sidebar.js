import React from 'react'
import Header from '../../components/Common/Header'
import Banner from '../../components/Common/Banner'
import LeftSideBar from '../../components/Shop/LeftSibeBar'
import Footer from '../../components/Common/Footer'
const ShopLeftSideBar = () => {
    return (
        <>
            <Header />
            <Banner title="Shop" />
            <LeftSideBar />
            <Footer />
        </>
    )
}

export default ShopLeftSideBar