import React from 'react'
import { DeleteOutlined} from '@ant-design/icons';

const ProductItem = ({ product }) => {
    return (
        <div class="col-4" >
            <div className="single-product-wrapper">
                {/* Product Image */}
                <div className="product-img">
                    <img src={"http://localhost:5000/getfile/"+product.image } />
                    {/* Hover Thumb */}
                    <img style={{objectFit:"cover"}} className="hover-img" src={"http://localhost:5000/getfile/" + product.image} alt />
                </div>
                {/* Product Description */}
                <div className="product-description d-flex align-items-center justify-content-between">
                    {/* Product Meta Data */}
                    <div className="product-meta-data">
                        <div className="line" />
                        <p className="product-price">${product.price}</p>
                        <a href="product-details.html">
                            <h6>{product.name}</h6>
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
                        <div className="cart">
                            <DeleteOutlined  style={{marginTop:"5px",cursor:'pointer',fontSize:"20px",color:"red"}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
