import { useState } from 'react'
import './RecipeGenerator.css'

function RecipeGenerator({ foodItems }) {
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [error, setError] = useState(null)

    // Get items that are expiring soon (within 7 days)
    const getExpiringItems = () => {
        return foodItems.filter(item => {
            if (item.consumed) return false
            const today = new Date()
            const expiry = new Date(item.expiryDate)
            const diffTime = expiry - today
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays >= 0 && diffDays <= 7
        })
    }

    const expiringItems = getExpiringItems()
    const activeItems = foodItems.filter(item => !item.consumed)

    const toggleItemSelection = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }

    const generateRecipe = async () => {
        if (selectedItems.length === 0) {
            setError('Please select at least one ingredient')
            return
        }

        setLoading(true)
        setError(null)

        const ingredients = selectedItems.map(id => {
            const item = foodItems.find(i => i.id === id)
            return item.name
        })

        try {
            // For demo purposes, we'll use a mock recipe generator
            // In production, this would call OpenAI API
            const mockRecipe = generateMockRecipe(ingredients)

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            setRecipe(mockRecipe)
        } catch (err) {
            setError('Failed to generate recipe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const generateMockRecipe = (ingredients) => {
        const recipes = {
            default: {
                title: `Delicious ${ingredients[0]} Delight`,
                prepTime: '15 mins',
                cookTime: '30 mins',
                servings: 4,
                ingredients: ingredients.map(ing => `1 cup ${ing.toLowerCase()}`),
                instructions: [
                    'Wash and prepare all ingredients thoroughly.',
                    `Heat a large pan over medium heat and add your ${ingredients[0]}.`,
                    'Cook for 5-7 minutes until slightly softened.',
                    `Add remaining ingredients (${ingredients.slice(1).join(', ')}) and season to taste.`,
                    'Continue cooking for 15-20 minutes, stirring occasionally.',
                    'Adjust seasoning and serve hot.',
                    'Garnish with fresh herbs if desired.'
                ],
                tips: [
                    'You can substitute ingredients based on what you have available.',
                    'This recipe works well with rice or pasta as a side dish.',
                    'Leftovers can be stored in the fridge for up to 3 days.'
                ]
            }
        }

        return recipes.default
    }

    return (
        <div className="recipe-generator fade-in">
            <div className="recipe-header">
                <div>
                    <h2>AI Recipe Generator</h2>
                    <p className="text-muted">
                        Select ingredients to generate a recipe and prevent food waste
                    </p>
                </div>
            </div>

            {expiringItems.length > 0 && (
                <div className="alert alert-warning">
                    <span className="alert-icon">⚠️</span>
                    <div>
                        <strong>Use these items first!</strong>
                        <p>{expiringItems.length} item(s) expiring within 7 days</p>
                    </div>
                </div>
            )}

            {activeItems.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">🥗</span>
                    <h3>No ingredients available</h3>
                    <p className="text-muted">Add food items to your pantry to generate recipes</p>
                </div>
            ) : (
                <>
                    <div className="ingredients-section card">
                        <h3>Select Ingredients</h3>
                        <div className="ingredients-grid">
                            {activeItems.map(item => (
                                <label key={item.id} className="ingredient-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => toggleItemSelection(item.id)}
                                    />
                                    <span className="checkbox-label">
                                        <span className="ingredient-name">{item.name}</span>
                                        {expiringItems.some(ei => ei.id === item.id) && (
                                            <span className="badge badge-warning">Expiring soon</span>
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div className="generate-section">
                            <button
                                className="btn btn-primary btn-large"
                                onClick={generateRecipe}
                                disabled={loading || selectedItems.length === 0}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Generating Recipe...
                                    </>
                                ) : (
                                    <>🤖 Generate Recipe</>
                                )}
                            </button>
                            {selectedItems.length > 0 && (
                                <p className="text-muted">
                                    {selectedItems.length} ingredient{selectedItems.length !== 1 ? 's' : ''} selected
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="error-message">{error}</div>
                        )}
                    </div>

                    {recipe && (
                        <div className="recipe-result card fade-in">
                            <div className="recipe-result-header">
                                <h3>{recipe.title}</h3>
                                <div className="recipe-meta">
                                    <span>⏱️ Prep: {recipe.prepTime}</span>
                                    <span>🍳 Cook: {recipe.cookTime}</span>
                                    <span>🍽️ Serves: {recipe.servings}</span>
                                </div>
                            </div>

                            <div className="recipe-content">
                                <div className="recipe-section">
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {recipe.ingredients.map((ing, idx) => (
                                            <li key={idx}>{ing}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="recipe-section">
                                    <h4>Instructions</h4>
                                    <ol>
                                        {recipe.instructions.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="recipe-section">
                                    <h4>Tips</h4>
                                    <ul className="tips-list">
                                        {recipe.tips.map((tip, idx) => (
                                            <li key={idx}>💡 {tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default RecipeGenerator
