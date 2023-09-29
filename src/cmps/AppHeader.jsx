import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return <header className="app-header" >
        <>
            <h1 className='logo'>Toyz-<span>N</span>-Us</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </>
    </header>
}
