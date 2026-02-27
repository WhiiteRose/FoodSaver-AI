import React from 'react'
import './FoodItem.css'

function FoodItem({ item, onDelete, onConsume, daysUntilExpiry }) {
    const getCategoryIcon = (category) => {
        // Keep category-to-icon mapping in one place for consistent visuals.
        const icons = {
            produce: '🥬',
            dairy: '🥛',
            meat: '🥩',
            grains: '🌾',
            canned: '🥫',
            frozen: '❄️',
            other: '📦'
        }
        return icons[category] || '📦'
    }

    const getStatusBadge = () => {
        // Badge priority is based on urgency to consume the item.
        if (daysUntilExpiry < 0) {
            return <span className="badge badge-danger">Expired</span>
        } else if (daysUntilExpiry <= 3) {
            return <span className="badge badge-warning">Expiring soon</span>
        } else if (daysUntilExpiry <= 7) {
            return <span className="badge badge-warning">Use this week</span>
        } else {
            return <span className="badge badge-success">Fresh</span>
        }
    }

    const formatDate = (dateString) => {
        // Display dates with a short US-friendly format used across the UI.
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        // Highlight items that are already expired or close to expiry.
        <div className={`food-item card ${daysUntilExpiry <= 3 ? 'expiring' : ''}`}>
            <div className="food-item-header">
                <span className="food-icon">{getCategoryIcon(item.category)}</span>
                {getStatusBadge()}
            </div>

            <div className="food-item-content">
                <h4>{item.name}</h4>
                <p className="text-muted">
                    {item.quantity && <span className="quantity">{item.quantity} • </span>}
                    Expires {formatDate(item.expiryDate)}
                </p>

                {daysUntilExpiry >= 0 && (
                    <p className="days-remaining">
                        {daysUntilExpiry === 0 ? 'Expires today' :
                            daysUntilExpiry === 1 ? 'Expires tomorrow' :
                                `${daysUntilExpiry} days remaining`}
                    </p>
                )}
            </div>

            <div className="food-item-actions">
                <button
                    className="btn btn-primary btn-small"
                    onClick={() => onConsume(item.id)}
                    title="Mark as consumed"
                >
                    ✓ Consumed
                </button>
                <button
                    className="btn btn-danger btn-small"
                    onClick={() => onDelete(item.id)}
                    title="Delete item"
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    )
}

export default FoodItem
