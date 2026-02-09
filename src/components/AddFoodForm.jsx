import { useState } from 'react'
import './AddFoodForm.css'

function AddFoodForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'produce',
        quantity: '',
        expiryDate: ''
    })

    const categories = [
        { value: 'produce', label: '🥬 Produce', shelfLife: 7 },
        { value: 'dairy', label: '🥛 Dairy', shelfLife: 14 },
        { value: 'meat', label: '🥩 Meat', shelfLife: 3 },
        { value: 'grains', label: '🌾 Grains', shelfLife: 90 },
        { value: 'canned', label: '🥫 Canned', shelfLife: 365 },
        { value: 'frozen', label: '❄️ Frozen', shelfLife: 180 },
        { value: 'other', label: '📦 Other', shelfLife: 30 }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // Auto-calculate expiry date when category changes
        if (name === 'category' && !formData.expiryDate) {
            const selectedCategory = categories.find(cat => cat.value === value)
            if (selectedCategory) {
                const expiryDate = new Date()
                expiryDate.setDate(expiryDate.getDate() + selectedCategory.shelfLife)
                setFormData(prev => ({
                    ...prev,
                    expiryDate: expiryDate.toISOString().split('T')[0]
                }))
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.expiryDate) {
            onSubmit(formData)
            setFormData({ name: '', category: 'produce', quantity: '', expiryDate: '' })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-food-form card">
            <h3>Add New Food Item</h3>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="name">Food Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        placeholder="e.g., Tomatoes"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                        id="category"
                        name="category"
                        className="input"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        className="input"
                        placeholder="e.g., 500g, 2 pieces"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        className="input"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Add Item
                </button>
            </div>
        </form>
    )
}

export default AddFoodForm
