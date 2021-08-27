import React, { useEffect } from 'react'

import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deletproductfromcart, resetcart, selectcart, selectTotal } from '../features/cart/cartSlice';
import { createorder, selectaddstatus } from '../features/orders/ordersSlice';
import { selectisauth, selectuser } from '../features/users/usersSlice'
import { message } from 'antd'

const Cart = () => {

    const cart = useSelector(selectcart)
    const total = useSelector(selectTotal)
    const isauth = useSelector(selectisauth)
    const user = useSelector(selectuser)
    const createstatus = useSelector(selectaddstatus)

    const dispatch = useDispatch()

    const getcartproductsids = () => {
        let arr = []
        for (let item of cart) {
            arr.push(item._id)
        }
        return arr
    }

    const success = () => {
        message.success('order successfuly sent');
    };


    const order = () => {

        const data = {
            client: user._id,
            total_price: total,
            products: getcartproductsids()
        }

        dispatch(createorder(data))
        success()
        dispatch(resetcart())
        window.location.href = '/ordersuccess'
    }

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-title mt-50">
                            <h2>Shopping Cart</h2>
                        </div>
                        <div className="cart-table clearfix">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        cart.map((p) => {
                                            return (
                                                <tr>
                                                    <td className="cart_product_img">
                                                        <a href="#"><img style={{ height: '100px', width: "100px" }} src={"http://localhost:5000/getfile/" + p.image} alt="Product" /></a>
                                                    </td>
                                                    <td className="cart_product_desc">
                                                        <h5>{p.name}</h5>
                                                    </td>
                                                    <td className="price">
                                                        <span>${p.price}</span>
                                                    </td>
                                                    <td className="qty">
                                                        <AiFillDelete onClick={() => dispatch(deletproductfromcart({ idp: p._id }))} style={{ color: "#FBB808", fontSize: "20px", cursor: "pointer" }} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>${total}</span></li>
                            </ul>
                            <div className="cart-btn mt-100">
                                {isauth && user && user.__t === 'client' && <a onClick={() => order()} className="btn amado-btn w-100">Order</a>}
                                {!isauth && <a href="/login" className="btn amado-btn w-100">Login</a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart