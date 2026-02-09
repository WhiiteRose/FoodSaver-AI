import React from 'react'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">🌱</span>
                        <h1>FoodSaver AI</h1>
                    </div>
                    <p className="tagline">Save food. Save money. Save the planet.</p>
                </div>
            </div>
        </header>
    )
}

export default Header
