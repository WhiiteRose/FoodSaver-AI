import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import PantryTracker from './components/PantryTracker'
import RecipeGenerator from './components/RecipeGenerator'
import ImpactDashboard from './components/ImpactDashboard'

function App() {
    const [currentView, setCurrentView] = useState('pantry')
    const [foodItems, setFoodItems] = useState([])
    const [stats, setStats] = useState({
        foodSaved: 0,
        co2Prevented: 0,
        waterSaved: 0,
        moneySaved: 0
    })

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
