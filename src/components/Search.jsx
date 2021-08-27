import React from 'react'

const Search = () => {


    const hanleclose = () => {
        const element = document.getElementById('docbody')
        element.classList.remove('search-wrapper-on')
    }
    
    return (
        <div className="search-wrapper section-padding-100">
            <div onClick={() => hanleclose()}  className="search-close">
                <i className="fa fa-close" aria-hidden="true" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="search-content">
                            <form action="#" method="get">
                                <input type="search" name="search" id="search" placeholder="Type your keyword..." />
                                <button type="submit"><img src="img/core-img/search.png" alt /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Search
