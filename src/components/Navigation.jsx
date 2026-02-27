import React from 'react'
import './Navigation.css'

function Navigation({ currentView, setCurrentView }) {
    // View tabs are configuration-driven to avoid duplicated button markup.
    const navItems = [
        { id: 'pantry', label: 'Pantry Tracker', icon: '🥗' },
        { id: 'recipes', label: 'AI Recipes', icon: '🤖' },
        { id: 'impact', label: 'My Impact', icon: '📊' }
    ]

    return (
        <nav className="navigation">
            <div className="container">
                <div className="nav-container">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                            // Delegate view changes to the parent so state stays centralized.
                            onClick={() => setCurrentView(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navigation
