import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import PantryTracker from './components/PantryTracker'
import RecipeGenerator from './components/RecipeGenerator'
import ImpactDashboard from './components/ImpactDashboard'

function App() {
    // Central app state shared across the three main views.
    const [currentView, setCurrentView] = useState('pantry')
    const [foodItems, setFoodItems] = useState([])
    const [stats, setStats] = useState({
        foodSaved: 0,
        co2Prevented: 0,
        waterSaved: 0,
        moneySaved: 0
    })

    // Only one feature view is rendered at a time, but all reuse the same data.
    return (
        <div className="app">
            <Header />
            <Navigation currentView={currentView} setCurrentView={setCurrentView} />

            <main className="container">
                {currentView === 'pantry' && (
                    <PantryTracker
                        foodItems={foodItems}
                        setFoodItems={setFoodItems}
                        setStats={setStats}
                    />
                )}
                {currentView === 'recipes' && (
                    <RecipeGenerator foodItems={foodItems} />
                )}
                {currentView === 'impact' && (
                    <ImpactDashboard stats={stats} foodItems={foodItems} />
                )}
            </main>
        </div>
    )
}

export default App
