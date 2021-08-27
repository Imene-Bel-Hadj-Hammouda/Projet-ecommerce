// import { Col, Row } from 'antd'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getproducts, selectproducts } from '../features/products/productsSlice'

// const Home = () => {

//     const dispatch = useDispatch()

//     const products = useSelector(selectproducts)

//     useEffect(() => {
//         dispatch(getproducts())
//     }, []);

//     return (
//         <div class="products-catagories-area clearfix">
//             <Row>

//                 {
//                     products.map((p, i) => {
//                         return (
//                             <CardItem product={p} />
//                         )
//                     })
//                 }
//             </Row>
//         </div>
//     )
// }

// function CardItem({ product }) {
//     return (
//         <div className="single-products-catagory clearfix">
//             <a href="shop.html">
//                 <img style={{height:"220px", width:"200px"}}   src={'http://localhost:5000/getfile/' + product.image} alt />
//                 {/* Hover Content */}
//                 <div className="hover-content">
//                     <div className="line" />
//                     <p>${product.price}</p>
//                     <h4 style={{fontSize:"10px"}}> {product.name} </h4>
//                 </div>
//             </a>
//         </div>
//     )
// }

// export default Home
import { Badge } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addproducttocart, selectcart } from '../features/cart/cartSlice';
import { getcategories, selectcategories } from '../features/categories/categoriesSlice';
import { filtercategory, getproducts, selectproducts } from '../features/products/productsSlice';
import { FaCartArrowDown } from 'react-icons/fa';

const Home = () => {

    const dispatch = useDispatch()

    const categories = useSelector(selectcategories)

    const products = useSelector(selectproducts)

    const cart = useSelector(selectcart)

    useEffect(() => {
        dispatch(getcategories())
        dispatch(getproducts())
    }, []);

    const ProductItem = ({ product }) => {


        const IsInCart = () => {

            let exist = false

            for (let item of cart) {
                if (item._id === product._id){
                    exist = true
                    break
                }
                    
            }

            if (exist) {
                return <FaCartArrowDown   style={{ color: "#FBB808", fontSize: "20px" }} />
            } else {
                return <a onClick={() => dispatch(addproducttocart({ prod: product }))} data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt /></a>
            }
        }
        return (
            <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                <div className="single-product-wrapper">
                    {/* Product Image */}
                    <div className="product-img">
                        <img style={{height:"200px", width:"200px"}} src={  "http://localhost:5000/getfile/" + product.image} alt />
                        {/* Hover Thumb */}
                        <img style={{ objectFit: 'cover' }} className="hover-img" src={"http://localhost:5000/getfile/" + product.image} alt />
                    </div>
                    {/* Product Description */}
                    <div className="product-description d-flex align-items-center justify-content-between">
                        {/* Product Meta Data */}
                        <div className="product-meta-data">
                            <div className="line" />
                            <p className="product-price">${product.price}</p>
                            <a href="product-details.html">
                                <h6> {product.name} </h6>
                            </a>
                        </div>
                        {/* Ratings & Cart */}
                        <div className="ratings-cart text-right">
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                            </div>
                            {/* <div className="cart">
                                <IsInCart />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="shop_sidebar_area"  >
                {/* ##### Single Widget ##### */}
                <div className="widget catagory mb-50">
                    {/* Widget Title */}
                    <h6 className="widget-title mb-30">Catagories</h6>
                    {/*  Catagories  */}
                    <div className="catagories-menu" style={{ height: "100%" }}>
                        <ul>
                            <li><a onClick={() => dispatch(filtercategory({ id: 'all' }))}  >All</a></li>

                            {
                                categories.map((c, i) => {
                                    return (
                                        <li><a onClick={() => dispatch(filtercategory({ id: c._id }))}  >{c.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>



            </div>


            <div className="amado_product_area section-padding-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                                {/* Total Products */}
                                <div className="total-products">
                                    <h2>Products </h2>

                                </div>
                                {/* Sorting */}
                                <div className="product-sorting d-flex">
                                    {/* filter  */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {
                            products.map((p, i) => {
                                return (
                                    <ProductItem product={p} />
                                )
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* Pagination */}
                            <nav aria-label="navigation">
                                <ul className="pagination justify-content-end mt-50">
                                    <li className="page-item active"><a className="page-link" href="#">01.</a></li>
                                    <li className="page-item"><a className="page-link" href="#">02.</a></li>
                                    <li className="page-item"><a className="page-link" href="#">03.</a></li>
                                    <li className="page-item"><a className="page-link" href="#">04.</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home
