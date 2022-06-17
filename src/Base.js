import React from 'react'
import { PostLoaderContextProvider } from './components/Contexts/PostLoaderContext'
import { PostReloadContextProvider } from './components/Contexts/PostReloaderContext'
import Nav from './components/navbar/Nav'


function Base({ children }) {
    return (

        <PostLoaderContextProvider>
            <PostReloadContextProvider>
                <div>
                    <Nav>


                        {children}
                    </Nav>

                </div>
            </PostReloadContextProvider>
        </PostLoaderContextProvider>


    )
}

export default Base
