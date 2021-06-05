import React from 'react'
import { PostReloadContextProvider } from './components/Contexts/PostLoaderContext'
import Nav from './components/navbar/Nav'


function Base({ children }) {
    return (
        <PostReloadContextProvider>
            <div>
                <Nav />
                {children}

            </div>
        </PostReloadContextProvider>

    )
}

export default Base
