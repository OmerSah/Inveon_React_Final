import React from 'react'
// import Img
import user1 from '../../../assets/img/user/user1.png'
import user2 from '../../../assets/img/user/user2.png'
import user3 from '../../../assets/img/user/user3.png'

const ReviewData = [
    {
        img: user1,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user2,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user3,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },

]

const ProductInfo = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="product_details_tabs">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" href="#description" className="active">Açıklama</a></li>
                            <li><a data-toggle="tab" href="#additional">Ek Bilgiler</a></li>
                            <li><a data-toggle="tab" href="#review">Yorumlar</a></li>
                        </ul>
                        <div className="tab-content">
                            <div id="description" className="tab-pane fade in show active">
                                <div className="product_description">
                                    <p>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac
                                        diam sit amet quam vehicula elementum sed sit amet dui.
                                        Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed,
                                        convallis at tellus. Sed porttitor lectus nibh.
                                        Donec sollicitudin molestie malesuada. Vivamus magna justo,
                                        lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan
                                        id imperdiet et, porttitor at sem.</p>
                                    <ul>
                                        <li>Vivamus magna justo, lacinia eget consectetur sed</li>
                                        <li>Curabitur aliquet quam id dui posuere blandit</li>
                                        <li>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar </li>
                                    </ul>
                                    <p>Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum
                                        porta.
                                        Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                                        Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum
                                        porta. Curabitur arcu erat, accumsan id imperdiet et,
                                        Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                        porttitor at sem. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                                    </p>
                                </div>
                            </div>
                            <div id="additional" className="tab-pane fade">
                                <div className="product_additional">
                                    <ul>
                                        <li>Weight: <span>400 g</span></li>
                                        <li>Dimensions: <span>10 x 10 x 15 cm</span></li>
                                        <li>Materials: <span> 60% cotton, 40% polyester</span></li>
                                        <li>Other Info: <span> American heirloom jean shorts pug seitan
                                            letterpress</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div id="review" className="tab-pane fade">
                                <div className="product_reviews">
                                    <ul>
                                        {ReviewData.map((data, index) => (
                                            <li className="media" key={index}>
                                                <div className="media-img">
                                                    <img src={data.img} alt="img" />
                                                </div>
                                                <div className="media-body">
                                                    <div className="media-header">
                                                        <div className="media-name">
                                                            <h4>{data.name}</h4>
                                                            <p>{data.date}</p>
                                                        </div>
                                                        <div className="post-share">
                                                            <a href="#!" className="replay">{data.replay}</a>
                                                            <a href="#!" className="">{data.report}</a>
                                                        </div>
                                                    </div>
                                                    <div className="media-pragraph">
                                                        <div className="product_review_strat">
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                            <span><a href="#!"><i className="fa fa-star"></i></a></span>
                                                        </div>
                                                        <p>{data.para}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo