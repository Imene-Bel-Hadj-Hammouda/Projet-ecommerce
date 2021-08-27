import Avatar from 'antd/lib/avatar/avatar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectcart } from '../features/cart/cartSlice'
import { getme, selectisauth, selectuser,logout } from '../features/users/usersSlice'

const Sidebar = () => {

    const dispatch = useDispatch()

    const isauth = useSelector(selectisauth)

    const user = useSelector(selectuser)

    const cart = useSelector(selectcart)

    const handlesearchclicked = () => {
        const element = document.getElementById('docbody')
        element.classList.add('search-wrapper-on')
    }

    const PrivateNavs = ({ url, text, roles }) => {

        if (isauth && roles.includes(user.__t)) {
            return <li><Link to={url}>{text}</Link></li>
        }else{
            return null
        }

    }

    return (
        <>
            <div class="mobile-nav">
                <div class="amado-navbar-brand">
                    <a href="index.html"><img src="img/core-img/logo.png" alt="" /></a>
                </div>

                <div class="amado-navbar-toggler">
                    <span></span><span></span><span></span>
                </div>
            </div>

            <header className="header-area clearfix" >
                {/* Close Icon */}
                <div className="nav-close">
                    <i className="fa fa-close" aria-hidden="true" />
                </div>
                {/* Logo */}
                <div className="logo">
                    <a href="index.html"><img src="img/core-img/logo.png" alt /></a>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "-50px", marginBottom: "30px" }} >
                    {isauth && <Avatar onClick={() => window.location.href = '/profile'} src={'http://localhost:5000/getfile/' + user.avatar} size={70} style={{ cursor: 'pointer', border: '1px solid gray' }} onClick={() => window.location.href = '/acount'} />}
                </div>

                {/* Amado Nav */}
                <nav className="amado-nav">
                    <ul>
                        <li className="active"><Link to="/home">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <PrivateNavs url='/users' text='Users' roles={['admin']}  />
                        <PrivateNavs url='/orders' text='Orders' roles={['admin']}  />
                        <PrivateNavs url='/clientorders' text='Orders' roles={['client']}  />
                        <PrivateNavs url='/products' text='Products' roles={['admin']}  />
                        <PrivateNavs url='/categories' text='Categories' roles={['admin']}  />
                        
                        
                    </ul>
                </nav>
                {/* Button Group */}
                <div className="amado-btn-group mt-30 mb-100">
                    {!isauth && <Link to='/login' style={{ color: 'white' }} ><a className="btn amado-btn mb-15">Login</a></Link>}
                    {isauth && <a onClick={()=>dispatch(logout())} className="btn amado-btn mb-15">Logout</a>}
                    {!isauth && <Link to='/register' style={{ color: 'white' }}  > <a className="btn amado-btn active"> Register</a></Link>}
                </div>
                {/* Cart Menu */}
                <div className="cart-fav-search mb-100">
                    <a href="/cart" className="cart-nav"><img src="img/core-img/cart.png" alt /> Cart <span>({cart.length})</span></a>
                    <a href="#" className="fav-nav"><img src="img/core-img/favorites.png" alt /> Favourite</a>
                    <a style={{ cursor: 'pointer' }} onClick={() => handlesearchclicked()} className="search-nav"><img src="img/core-img/search.png" alt /> Search</a>
                </div>
                {/* Social Button */}
                <div className="social-info d-flex justify-content-between">
                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                    <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                </div>
            </header>
        </>
    )
}

export default Sidebar