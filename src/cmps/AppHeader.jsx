import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    const user = useSelector((state) => state.userModule.user)

    return <header className="app-header" >
        <>
            <h1 className='logo'>Toyz-<span>N</span>-Us</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login">{!user ? 'Login' : user.fullname}</NavLink>
            </div>
        </>
    </header>
}
