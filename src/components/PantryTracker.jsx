import { useState, useEffect } from 'react'
import './PantryTracker.css'
import FoodItem from './FoodItem'
import AddFoodForm from './AddFoodForm'

function PantryTracker({ foodItems, setFoodItems, setStats }) {
    const [showForm, setShowForm] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('foodItems')
        if (saved) {
            setFoodItems(JSON.parse(saved))
        }
    }, [])

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('foodItems', JSON.stringify(foodItems))
        updateStats()
    }, [foodItems])

    const updateStats = () => {
        const totalItems = foodItems.length
        const savedItems = foodItems.filter(item => item.consumed).length

        // Calculate stats based on saved items
        setStats({
            foodSaved: savedItems * 0.5, // ~0.5 lbs per item
            co2Prevented: savedItems * 2.5, // ~2.5 kg CO2 per item
            waterSaved: savedItems * 50, // ~50 gallons per item
            moneySaved: savedItems * 4 // ~$4 per item
        })
    }

    const addFoodItem = (item) => {
        const newItem = {
            id: Date.now(),
            ...item,
            addedDate: new Date().toISOString(),
            consumed: false
        }
        setFoodItems([...foodItems, newItem])
        setShowForm(false)
    }

    const deleteItem = (id) => {
        setFoodItems(foodItems.filter(item => item.id !== id))
    }

    const markAsConsumed = (id) => {
        setFoodItems(foodItems.map(item =>
            item.id === id ? { ...item, consumed: true } : item
        ))
    }

    const getDaysUntilExpiry = (expiryDate) => {
        const today = new Date()
        const expiry = new Date(expiryDate)
        const diffTime = expiry - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const getExpiringItems = () => {
        return foodItems.filter(item => {
            if (item.consumed) return false
            const days = getDaysUntilExpiry(item.expiryDate)
            return days >= 0 && days <= 3
        })
    }

    const expiringItems = getExpiringItems()
    const activeItems = foodItems.filter(item => !item.consumed)

    return (
        <div className="pantry-tracker fade-in">
            <div className="pantry-header">
                <div>
                    <h2>My Pantry</h2>
                    <p className="text-muted">
                        {activeItems.length} active items {expiringItems.length > 0 && `• ${expiringItems.length} expiring soon`}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Item'}
                </button>
            </div>

            {expiringItems.length > 0 && (
                <div className="alert alert-warning">
                    <span className="alert-icon">⚠️</span>
                    <div>
                        <strong>Items expiring soon!</strong>
                        <p>{expiringItems.length} item(s) need your attention</p>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="form-container fade-in">
                    <AddFoodForm onSubmit={addFoodItem} onCancel={() => setShowForm(false)} />
                </div>
            )}

            {activeItems.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">🥗</span>
                    <h3>Your pantry is empty</h3>
                    <p className="text-muted">Add your first food item to start tracking</p>
                </div>
            ) : (
                <div className="food-grid">
                    {activeItems.map(item => (
                        <FoodItem
                            key={item.id}
                            item={item}
                            onDelete={deleteItem}
                            onConsume={markAsConsumed}
                            daysUntilExpiry={getDaysUntilExpiry(item.expiryDate)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PantryTracker
