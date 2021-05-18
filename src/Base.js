import React from 'react'
import Nav from './components/navbar/Nav'


function Base({children}) {
    return (
        <div>
            <Nav />
            {children}
            
        </div>
    )
}

export default Base
