import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return <header className="app-header" >
        <>
            <h1>Toyz-N-Us</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </div>
        </>
    </header>
}
